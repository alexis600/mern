import axios, { AxiosResponse } from 'axios';
import Consultas from '../Zabbix/Consultas';
import RegistroAlarma from './RegistroAlarma'
import moment from 'moment'
import { strict } from 'assert/strict';
const axiosConfig= {headers: {"Content-Type": "application/json"}};
const consulta = new Consultas();

export default class RegServices {    

    async postProblems (problemas:string, token:string) {
        const metodoProblems = await axios.post(`${process.env.ZABBIX_SERVER}`, 
            problemas, axiosConfig);               
        return await this.metodoProblems(metodoProblems, consulta, token);
    }

    async metodoProblems (postProblems:AxiosResponse, consulta: Consultas, token:string)  {                            
        var alarmas = postProblems.data.result;
        var nuevoArreglo: Array< {
            Severity: string,
            Time: string,
            RecoveryTime: string,
            Status: string,
            Host: string,
            Problem: string,
            Duration: string,
            Ack: string,
            Actions: string,
            Tags: string
        }> = []
        if (alarmas !== undefined && alarmas.length > 0) {
            for (var i = 0; i < alarmas.length; i++) {   
                var fila = new RegistroAlarma(); 
                var alarma = alarmas[i];
                switch(alarma.severity) {
                    case "0": 
                        alarma.severity = "Not classified";
                        break;
                    case "1":                                 
                        alarma.severity = "Information";
                        break;
                    case "2": 
                        alarma.severity = "Warning";
                        break;
                    case "3": 
                        alarma.severity = "Average";
                        break;
                    case "4":                                 
                        alarma.severity = "High";
                        break;
                    case "5":                                 
                        alarma.severity = "Disaster";
                        break;
                    default:
                        alarma.severity = "Defectooooooooooo";
                }
                fila.setState("Severity", alarma.severity);
                var hora  = new Date(alarma.clock * 1000);
                var horaZbx = moment(hora).format("YYYY-MM-DD HH:mm:ss");
                fila.setState("Time", horaZbx);
                var now = moment(new Date());
                var duracion = now.from(hora, true)
                fila.setState("Duration", duracion);
                fila.setState("Problem", alarma.name);
                (alarma.acknowledged==="1")? fila.setState("Ack", "Yes"): fila.setState("Ack", "No");            
                var eventid = alarma.eventid;            
                const eventos = consulta.getEventos(token, eventid);                        
                var idobj = await this.eventosBD(eventos);            
                const triggers = consulta.getTriggers(token, idobj);
                var host = await this.triggersBD(triggers);                    
                fila.setState("Host", host);                
                nuevoArreglo.push(fila.state);                 
            }
        }        
        
        return nuevoArreglo;
    }
    
    async eventosBD (eventos: object) {                
        const postEvents = await axios.post(`${process.env.ZABBIX_SERVER}`,
            eventos, axiosConfig)            
        return postEvents.data.result[0].objectid;           
    }

    async triggersBD (objetos: object) {
        const postTriggers = await axios.post(`${process.env.ZABBIX_SERVER}`,
            objetos, axiosConfig)        
        return postTriggers.data.result[0].hosts[0].host;
    } 
}

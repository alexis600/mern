class Consultas {

    logout(token: string) {
        const salirStr = {
            "jsonrpc": "2.0",
            "method": "user.logout",
            "params": {
            },
            "id": 1,
            "auth": token
        }        
        return salirStr;
    }

    getProblemas(token: string) {        
        const state = {
            consulToken: token,
            problemStr: {
                "jsonrpc": "2.0",
                "method": "problem.get",
                "params": {
                    "filter": {"severity": ["2", "3"]},
                    "output": ["eventid", "severity", "clock", "name", "acknowledged"]
                },            
                "auth": token,
                "id": 1
            }    
        }
        return state.problemStr;
    }
    getEventos(token: string, evento: string) {
        const state = {
            consulToken: token,
            eventoStr:{
                "jsonrpc": "2.0",
                "method": "event.get",
                "params": {
                    "filter": {"eventid" : evento},
                    "output":["eventid", "objectid"]
                },             
                "auth": token,
                "id": 1
            }
        }
        return state.eventoStr;
    }
    
    getTriggers(token: string, triggerids: string) {
        const state = {
            consulToken: token,
            triggerStr: {
                "jsonrpc": "2.0",
                "method": "trigger.get",
                "params": {
                    "triggerids" : triggerids,
                    "output":["triggerid","correlation_tag"],
                    "selectFunctions": "extend",
                    "selectHosts": {"output": "host"}            
                },                
                "auth": token,
                "id": 1                
            }
        }
        return state.triggerStr;
    }       
}
export default Consultas;
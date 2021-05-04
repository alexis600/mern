export default class RegistroAlarma {
    state = {            
        Severity:"",
        Time:"",
        RecoveryTime:"",
        Status:"PROBLEM",
        Host:"",
        Problem:"",
        Duration:"",
        Ack:"",
        Actions:"",
        Tags:""
    }
    
    setState(key:string, value: string) {        
        switch (key) {            
            case "Severity":
                this.state.Severity = value;
                break;
            case "Time":
                this.state.Time = value;
                break;
            case "RecoveryTime":
                this.state.RecoveryTime = value;
                break;
            case "Status":
                this.state.Status = value;
                break;
            case "Host":
                this.state.Host = value;
                break;
            case "Problem":
                this.state.Problem = value;
                break;
            case "Duration":
                this.state.Duration = value;
                break;
            case "Ack":
                this.state.Ack = value;
                break;
            case "Actions":
                this.state.Actions = value;
                break;
            case "Tags":
                this.state.Tags = value;
                break;
        }        
    }
}
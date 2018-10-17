import React from "react";


export default class Element extends React.Component {
    constructor(props) {
        super(props);
        let timeFromLS = this.props.element.timeSpend.split(":");
        this.state = {
            hours : timeFromLS[0],
            min: timeFromLS[1],
            sec: timeFromLS[2],
            startStopButton: "Start" 
        };
        this.timer = null;
        this.dragEnterCounter = 0;
    }

    getClickedElement = () => {
        this.props.changeElementStatus(this.props.element.name, "DONE");
    }

    startTime = () => {
        this.props.changeElementStatus(this.props.element.name, "IN PROGRESS");
        let time = this.props.element.timeSpend.split(":");
        if(this.state.sec === "00" || 
          (this.state.sec === "00" && this.state.min !== "00") ||
           (this.state.sec === "00" && this.state.min === "00" && this.state.hours !== "00" )){
            this.setState({
                hours: time[0],
                min: time[1],
                sec: time[2],
            });
        }
        
        this.setState({
            startStopButton: "Stop"
        })
        
        this.timer = setInterval(() => {
            let seconds = this.state.sec;
            seconds++;
            if(seconds === 60) {
                seconds = 0;
                let minutes = this.state.min;
                minutes++;
                if(minutes === 60) {
                    minutes = 0;
                    let hours = this.state.hours;
                    hours++;
                    this.setState({
                        hours: hours < 10 ? "0" + hours : hours
                    });
                }
                this.setState({
                    min: minutes < 10 ? "0" + minutes : minutes
                });
            }
            this.setState({
                sec: seconds < 10 ? "0" + seconds : seconds,
            });
            this.props.updateTimeInfo(this.props.element.name, this.state.hours, this.state.min, this.state.sec)
        }, 1000);
    }

    stopTime = () => {
        clearInterval(this.timer);
        this.setState({
            startStopButton: "Start"
        });   
    }

    handleDragStart = (e) => {
        this.dragEnterCounter = 0;
        e.dataTransfer.setData("Text/html", this.props.element.name);
        this.props.getTransferringData(this.props.element.name);
        
    }


    handleDrop = (e) => {        
        let target = document.getElementById("overDND");
        if(target != null) {
            let data = e.dataTransfer.getData("text/html");
            if(this.props.element.name !== data) {
                this.props.shuffleElements(data, this.props.element.name);
                target.id = "";
            }
        }
        this.dragEnterCounter = 0;
    }

    handleDragEnter = (e) => {
        this.dragEnterCounter++;
        let target = e.target;
        if(target.className !== "element-block") {
            target = target.parentNode
        }
        if(target.className === "element-block" && this.props.element.name !== this.props.transferringData && this.dragEnterCounter > 0) {
            let oldTarget = document.getElementById("overDND");
            if(oldTarget !== null) oldTarget.id = "";
            target.id = "overDND";
        }
    }

    handleDragLeave = (e) => {
        this.dragEnterCounter--;
        let target = document.getElementById("overDND");
        if(target !== null && this.dragEnterCounter === 0) {
            target.id = "";
        }     
    }

    handleDragEnd = (e) => {
        let target = document.getElementById("overDND");
        if(target !== null) {
            target.id = "";
        }
        this.dragEnterCounter = 0;
    }
    
    

    render(){
        return(
            <div className="element-block" 
                 onDragStart={this.handleDragStart} 
                 onDrop     ={this.handleDrop}
                 onDragEnter={this.handleDragEnter}
                 onDragLeave={this.handleDragLeave}
                 onDragEnd  ={this.handleDragEnd}
                 draggable
            >
                <li className="element-block__text"> {this.props.name}</li>
                <div className="element-block__time">
                    {this.state.hours}:{this.state.min}:{this.state.sec}
                </div>
                <button className={"element-block__button " + this.state.startStopButton} 
                        onClick= {this.state.startStopButton === "Start" ?
                                                         this.startTime : this.stopTime}
                         >
                    {this.state.startStopButton}
                </button>
                <button className="element-block__button-end" onClick={this.getClickedElement}>
                    End
                </button>
            </div>
        )
    }
}
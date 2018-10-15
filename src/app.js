import React from "react"; 

import List from "./list.js";
import AddBox from "./addbox.js";



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBuffer: localStorage.listOfDeeds ? JSON.parse(localStorage.listOfDeeds) : [],
            newElementBuffer: ""
        }
    }

    getValueFromInputField = (e) => {
        this.setState({
            newElementBuffer: e.target.value,
        });
    }

    validateInput(value) {
        if(value.match(/^(\w+(\s*)?){1,}$/) && value.length >= 3) 
            return true;
        else return false;
    }


    isInList(value){
        for(let i = 0; i < this.state.listBuffer.length; i++) {
            if(this.state.listBuffer[i].name.toLowerCase() === this.state.newElementBuffer.toLowerCase()) {
                return true;
            } 
        }
        return false;
    }

    addNewElementIntoBuffer = () => {
        let {newElementBuffer, listBuffer} = this.state;
        if(!this.isInList(newElementBuffer) && this.validateInput(newElementBuffer)) {
            listBuffer.push({"name": newElementBuffer, "status":"SUSPENDED", "timeSpend": "00:00:00"});
            this.setState({newElementBuffer: ""});
            this.forceUpdate();
            this.addElementToLocalStorage();
            return true;
        }
        else return false;
    }

    addElementToLocalStorage() {
        localStorage.setItem("listOfDeeds", JSON.stringify(this.state.listBuffer));
    }

    changeElementStatus = (element, status) => {
        let {listBuffer} = this.state;
        for(let i = 0; i < listBuffer.length; i++) {
            if(listBuffer[i].name === element) {
                listBuffer[i].status = status;
                this.forceUpdate();

                if(status === "DONE") {
                    this.deleteElementIfDone(i)
                }
            }
        }
        this.addElementToLocalStorage();
    }


    deleteElementIfDone(index) {
        this.state.listBuffer.splice(index, 1);
    }

    updateTimeInfo = (element, hours, min, sec) => {
        let {listBuffer} = this.state;
        for(let i = 0; i < listBuffer.length; i++) {
            if(listBuffer[i].name === element) {
                listBuffer[i].timeSpend = hours + ":" + min + ":" + sec;
            }
        }
        
        this.forceUpdate();
        this.addElementToLocalStorage();
    }

    shuffleElements = (first, second) => {
        let firstIndex, secondIndex;
        let {listBuffer} = this.state;

        for(let key in listBuffer) {
            if(listBuffer[key].name === first) {
                firstIndex = [key];
            }
            else if(listBuffer[key].name === second) {
                secondIndex = [key]
            }
        }
        let temp = listBuffer[firstIndex];
        listBuffer[firstIndex] = listBuffer[secondIndex];
        listBuffer[secondIndex] = temp;
        this.forceUpdate();
        this.addElementToLocalStorage();
    }


    render() {
        return (
            <div className="main-block">
                <div className="main-block__header">To Do List</div>
                
                <AddBox getValueFromInputField={this.getValueFromInputField}
                        addNewElementIntoBuffer={this.addNewElementIntoBuffer}
                        inputValue={this.state.newElementBuffer} />
               
                <List  listBuffer={this.state.listBuffer} 
                       searchFor={this.state.newElementBuffer}
                       changeElementStatus={this.changeElementStatus}
                       updateTimeInfo={this.updateTimeInfo}
                       shuffleElements={this.shuffleElements}/>
                
            </div>
        )
    }
};
import React from "react";
import ListElement from "./listelement.js";

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transferringData: null
        }
    }

    fillListWithElements() {
        let {listBuffer} = this.props;
        if(listBuffer) {
            let elementsArr = [];
            for(let i = 0; i < listBuffer.length; i++) {
                if(listBuffer[i].name.match(this.props.searchFor)) 
                    elementsArr.push(
                        <ListElement key={listBuffer[i].name} 
                                     name={listBuffer[i].name} 
                                     element={listBuffer[i]} 
                                     id={i}
                                     changeElementStatus={this.props.changeElementStatus}
                                     updateTimeInfo={this.props.updateTimeInfo}
                                     shuffleElements={this.props.shuffleElements}
                                     transferringData={this.state.transferringData}
                                     getTransferringData={this.getTransferringData}/>
                    );
            }
            return elementsArr;
        }
        else return null;
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    getTransferringData = (data) => {
        this.setState({
            transferringData: data
        })
    }


    render(){ 
        return ( 
            <div className="list" onDragOver={this.handleDragOver}>
                {this.fillListWithElements()}
            </div>
        )
    }
}
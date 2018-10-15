import React from "react"; 

const AddBox = (props) => {
    return (
        <div className="add-element-block">
            <input 
                maxLength ="21" 
                value = {props.inputValue} 
                className="add-element-block__input" type="text" 
                placeholder="Type here" 
                onChange={props.getValueFromInputField}
            />
            <button className="add-element-block__button" onClick={props.addNewElementIntoBuffer}>
                Add!
            </button>
        </div>
    )
}

export default AddBox;
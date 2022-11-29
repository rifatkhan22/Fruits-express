const React = require("react");

class Show extends React.Component{
    render() { 
        const {name,color,readyToEat} = this.props.vegetable
        //const vegetable = this.props.vegetable 
        //console.log(this.props.vegetable)
        return (
            <div>
                <h1>Show Page</h1>
                <div>
                <p>The {name} is {color}.</p>
                {readyToEat ? " It is ready to eat!" : " It is not ready to eat... don't touch that"}
                
                </div>
            </div>
        )
    }
}

module.exports = Show
const React = require("react")
const DefaultLayout = require("../layout/Default")

class Edit extends React.Component {
    render() {
        return (
            <DefaultLayout title = "Edit Page">
                <form action={`/fruits/${this.props.fruit._id}?_method=PUT`} method = "POST">
                    Name: <input type = "text" name="name" defaultValue ={this.props.fruit.name}/>
                    Color: <input type = "text" name = "color" defaultValue = {this.props.fruit.color} /><br />
                    Is Ready To Eat: 
                    {this.props.fruit.readyToEat? <input type = "checkbox" name= "readyToEat" defaultChecked/>: 
                    <input type = "checkbox" name= "readyToEat"/>} <br />
                {/* NOTE: checking if readytoeat is true if it's true than does the first thing
                 before the colon put input as a checkbox and default as checked
                 if false then make a regular input that is not checked*/}
                 <input type ="submit" value = {`Edit ${this.props.fruit.name}`} />
                </form>
            </DefaultLayout>
        )
    }
}

module.exports = Edit
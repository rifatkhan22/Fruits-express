const React = require('react')

class Index extends React.Component {
    render() {
        const {vegetables} = this.props
        return (
            <div>
                <h1>Vegetables Index Page</h1>
                <nav>
                    <a href='/vegetables/new'>Create Vegetable</a>
                </nav>
                <ul>
                {
                    //map returns a new array- browser can read that
                    vegetables.map((vegetable,i) => {
                        return (
                            <li> 
                            The {' '}
                            <a href= {`/vegetables/${vegetable._id}`}>
                                {vegetable.name}</a>
                                {' '}
                                is {vegetable.color} <br />
                                {
                                    vegetable.readyToEat 
                                    ?"it is ready to eat"
                                    :'it is not ready to eat'
                                }
                                <br />
                            </li>
                        )
                    })
                }
                 </ul>
            </div>

        )
    } 
}

module.exports = Index
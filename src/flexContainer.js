const FlexContainer = ({elements}) => {
    return (
        <div style={{border:'1px solid red',
                    textAlign:'center',
                    width:'300px',
                    marginRight:'15px',
                    marginLeft:'40px'}}>

            {elements.map((element, index) => (
            <div style={{border:'2px solid grey',
                        borderRadius:'5px',
                        margin:'5px',
                        padding:'15px'}}>

                <div style={{backgroundColor:'grey',
                            padding:'5px',
                            borderRadius:'5px',
                            marginBottom:'5px',
                            width:'max-content'}}>
                    {element.id}
                </div>
                
                <div key={index} 
                     style={{backgroundColor:'grey',
                            padding:'2px',
                            borderRadius:'5px',
                            marginBottom:'5px'}}>
                    {element.title}
                </div>

                <div style={{backgroundColor:'grey',
                            padding:'5px',
                            borderRadius:'5px',
                            marginBottom:'5px',
                            width:'max-content'}}>
                        Feature request
                </div>
            </div>
            ))}
        </div>
     );
}
 
export default FlexContainer;
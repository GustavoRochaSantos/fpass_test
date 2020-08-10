import React from 'react'
import { Container, Background } from './style'

//-- Interface de parametros adicionais.
interface AddProps { 
  text?: string, 
  clickBackground: () => void;
}

const Popup:React.FC<AddProps>= (props) => {

  return  (
    <Background
     
    >
    <Container >
      {props.children}
    </Container>
    
  </Background>
  )
}

export default Popup
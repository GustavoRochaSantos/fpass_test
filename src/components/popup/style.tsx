import styled from 'styled-components'

export const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0,0,0, 0.5);
`
export const Container = styled.div`
    background: white;
    padding: 15px 30px 30px 30px;
    min-height:300px;
    width:300px;

    border-radius: 5px;

    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    
    margin: auto;
    z-index: 999;

`

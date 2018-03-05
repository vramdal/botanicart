import css from 'styled-jsx/css'

export default css`

.content {
  margin: auto;
}

@media screen and (max-width: 800px) {
  :global(.content) {
      width: 90%;
      max-width: 600px;
  }
}
@media screen and (min-width: 800px) {

  :global(body.forside .content) {
    width: 50%;
  }
  
  :global(body.forside .slide img) {
    max-width: 400px;
  } 
}
`
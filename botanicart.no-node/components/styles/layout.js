import css from 'styled-jsx/css'

export default css`
@media screen and (max-width: 900px)
.content {
    width: 90%;
    max-width: 600px;
}
@media screen and (min-device-width: 800px)
.content {
     min-width: 500px;
}
.content {
    width: 50%;
    margin: 0 auto;
}
`
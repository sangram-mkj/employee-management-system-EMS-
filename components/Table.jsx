import styled from 'styled-components';


export const Table = styled.table`
border: 1px solid black;
width: 100%;

& > thead {
    background-color: #01987a;
}
& > tbody > tr:hover {
    background-color: #f3f3f3;
    color: #01987a;
}
`;
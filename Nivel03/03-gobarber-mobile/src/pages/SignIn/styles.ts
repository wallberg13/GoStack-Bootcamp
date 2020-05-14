import styled from "styled-components/native";

// A unica coisa que não conseguimos fazer é estilização no
// react-native é o encadeamento de estilos, fora isso, o css é igual.

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: "RobotoSlab-Medium"; /** Fazer ser a fonte padrão */
  margin: 64px 0 24px;
`;

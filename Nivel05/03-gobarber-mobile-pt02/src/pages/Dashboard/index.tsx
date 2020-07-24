import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle,
} from "./styles";
import Icon from "react-native-vector-icons/Feather";

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get("/providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate("Profile");
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId) => {
      navigate("CreateAppointment", { providerId });
    },
    [navigate]
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        // A diferença de colocar um header dentro e fora da lista, é que
        // dentro da lista ele acompanha o scroll.
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider, index }) => (
          <ProviderContainer
            isLast={index + 1 === providers.length}
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h as 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
      <Button style={{ height: 64 }} onPress={signOut}>
        Sair
      </Button>
    </Container>
  );
};

export default Dashboard;


import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Alert,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  ArrowLeft,
  X,
  CalendarDays,
  MapPin,
  Wallet,
  UserRound,
  CreditCard,
  Clock3,
  Ban,
  MessageCircle,
  CheckCircle2,
  Circle,
} from 'lucide-react-native';

import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { useTheme } from '../../../components/context/ThemeContext';

import { CONTRATACOES_LIST } from '../../../components/contratacoes/contratacoesData';

export default function DetalhesContratacaoScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const { theme, isLightMode } = useTheme();

  const contratacao = CONTRATACOES_LIST.find(
    (item) => item.id === id
  );

  const styles = getStyles(theme);

  if (!contratacao) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.title}>
            Contratação não encontrada
          </Text>

          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} color={theme.textPrimary} />
            <Text style={styles.backButtonText}>
              Voltar para Contratações
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const IconComponent = contratacao.icon;

  const statusColor =
    contratacao.status === 'Pendente'
      ? '#F2994A'
      : contratacao.status === 'Confirmado'
        ? '#56CCF2'
        : contratacao.status === 'Concluido'
          ? '#27AE60'
          : '#BDBDBD';

  const statusBackground =
    contratacao.status === 'Pendente'
      ? '#FFF0D8'
      : contratacao.status === 'Confirmado'
        ? '#DDF3FC'
        : contratacao.status === 'Concluido'
          ? '#D9F2E5'
          : '#EAEAEA';

  const avatarBackground = isLightMode
    ? contratacao.lightBgColor
    : contratacao.darkBgColor;

  // Valores demonstrativos para a apresentação visual.
  // Posteriormente serão substituídos pelos dados do banco.
  const valoresDemo: Record<string, string> = {
    '1': 'R$ 450,00',
    '2': 'R$ 1.800,00',
    '3': 'R$ 600,00',
    '4': 'R$ 800,00',
  };

  const valor = valoresDemo[contratacao.id] ?? 'A definir';

  const descricaoDemo: Record<string, string> = {
    '1': 'Apresentação musical solo com violão e voz para evento. Repertório variado com foco em MPB e pop nacional.',
    '2': 'Apresentação musical com repertório de forró e músicas populares para evento.',
    '3': 'Apresentação de DJ com repertório de música eletrônica e set personalizado.',
    '4': 'Apresentação musical de MPB com repertório selecionado para o evento.',
  };

  const descricao =
    descricaoDemo[contratacao.id] ??
    'Descrição do serviço ainda não informada.';

  const voltar = () => router.back();

  const enviarMensagem = () => {
    Alert.alert(
      'Enviar mensagem',
      'A integração com o sistema de mensagens será implementada posteriormente.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isLightMode ? 'dark-content' : 'light-content'}
        backgroundColor={theme.headerBg}
      />

      <View style={styles.dashboardContainer}>
        <Sidebar activeRoute="contratacoes" />

        <View style={styles.mainContent}>
          <Header />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentWrapper}>

              {/* Navegação superior */}
              
            <View style={styles.topNavigation}>
              <View />

              <Pressable
                onPress={voltar}
                style={styles.closeButton}
                accessibilityLabel="Fechar detalhes"
              >
                <X size={22} color={theme.textSecondary} />
              </Pressable>
            </View>


              {/* Cabeçalho do contratado */}
              <View style={styles.profileHeader}>
                <View
                  style={[
                    styles.avatar,
                    { backgroundColor: avatarBackground },
                  ]}
                >
                  <IconComponent
                    size={34}
                    color={contratacao.iconColor}
                  />
                </View>

                <View style={styles.profileInfo}>
                  <Text style={styles.artistName}>
                    {contratacao.name}
                  </Text>

                  <Text style={styles.artistCategory}>
                    {contratacao.category}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusBackground },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        { color: statusColor },
                      ]}
                    >
                      {contratacao.status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Resumo da contratação */}
              <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                  <CalendarDays
                    size={21}
                    color={theme.textSecondary}
                  />

                  <View style={styles.summaryTextContainer}>
                    <Text style={styles.summaryValue}>
                      {contratacao.date.split(' - ')[0]}
                    </Text>

                    <Text style={styles.summaryLabel}>
                      {contratacao.date.split(' - ')[1] ?? 'Horário a definir'}
                    </Text>
                  </View>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryItem}>
                  <MapPin
                    size={21}
                    color={theme.textSecondary}
                  />

                  <View style={styles.summaryTextContainer}>
                    <Text style={styles.summaryValue}>
                      {contratacao.location}
                    </Text>

                    <Text style={styles.summaryLabel}>
                      Local do evento
                    </Text>
                  </View>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.summaryItem}>
                  <Wallet
                    size={21}
                    color={theme.textSecondary}
                  />

                  <View style={styles.summaryTextContainer}>
                    <Text style={styles.summaryValue}>
                      {valor}
                    </Text>

                    <Text style={styles.summaryLabel}>
                      Valor total
                    </Text>
                  </View>
                </View>
              </View>

              {/* Descrição */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Descrição do serviço
                </Text>

                <Text style={styles.description}>
                  {descricao}
                </Text>
              </View>

              {/* Participantes */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Participantes
                </Text>

                <View style={styles.participantsContainer}>
                  <View style={styles.participantCard}>
                    <View style={styles.initialAvatar}>
                      <UserRound
                        size={23}
                        color="#FFFFFF"
                      />
                    </View>

                    <View style={styles.participantInfo}>
                      <Text style={styles.participantRole}>
                        Contratante
                      </Text>

                      <Text style={styles.participantName}>
                        Dados não informados
                      </Text>

                      <Text style={styles.participantEmail}>
                        Aguardando integração
                      </Text>
                    </View>
                  </View>

                  <View style={styles.participantCard}>
                    <View
                      style={[
                        styles.participantArtistAvatar,
                        { backgroundColor: avatarBackground },
                      ]}
                    >
                      <IconComponent
                        size={23}
                        color={contratacao.iconColor}
                      />
                    </View>

                    <View style={styles.participantInfo}>
                      <Text style={styles.participantRole}>
                        Artista
                      </Text>

                      <Text style={styles.participantName}>
                        {contratacao.name}
                      </Text>

                      <Text style={styles.participantEmail}>
                        Perfil do contratado
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Condições */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Condições
                </Text>

                <View style={styles.conditionRow}>
                  <CreditCard
                    size={19}
                    color={theme.textSecondary}
                  />

                  <Text style={styles.conditionLabel}>
                    Forma de pagamento
                  </Text>

                  <Text style={styles.conditionValue}>
                    A definir
                  </Text>
                </View>

                <View style={styles.conditionRow}>
                  <Clock3
                    size={19}
                    color={theme.textSecondary}
                  />

                  <Text style={styles.conditionLabel}>
                    Prazo de pagamento
                  </Text>

                  <Text style={styles.conditionValue}>
                    A definir
                  </Text>
                </View>

                <View style={styles.conditionRow}>
                  <Ban
                    size={19}
                    color={theme.textSecondary}
                  />

                  <Text style={styles.conditionLabel}>
                    Cancelamento
                  </Text>

                  <Text style={styles.conditionValue}>
                    Conforme acordo
                  </Text>
                </View>
              </View>

              {/* Acompanhamento */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Acompanhamento
                </Text>

                <View style={styles.timeline}>

                  <View style={styles.timelineItem}>
                    <View style={styles.timelineMarker}>
                      <CheckCircle2
                        size={20}
                        color="#F2994A"
                      />
                    </View>

                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>
                        Solicitação enviada
                      </Text>

                      <Text style={styles.timelineDescription}>
                        Etapa inicial da contratação
                      </Text>
                    </View>
                  </View>

                  <View style={styles.timelineItem}>
                    <View style={styles.timelineMarker}>
                      {contratacao.status === 'Confirmado' ||
                      contratacao.status === 'Concluido' ? (
                        <CheckCircle2
                          size={20}
                          color="#27AE60"
                        />
                      ) : (
                        <Circle
                          size={20}
                          color="#BDBDBD"
                        />
                      )}
                    </View>

                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>
                        Aguardando aceite do artista
                      </Text>

                      <Text style={styles.timelineDescription}>
                        {contratacao.status === 'Pendente'
                          ? 'Aguardando confirmação'
                          : 'Etapa demonstrativa'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.timelineItem}>
                    <View style={styles.timelineMarker}>
                      {contratacao.status === 'Confirmado' ||
                      contratacao.status === 'Concluido' ? (
                        <CheckCircle2
                          size={20}
                          color="#27AE60"
                        />
                      ) : (
                        <Circle
                          size={20}
                          color="#BDBDBD"
                        />
                      )}
                    </View>

                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>
                        Aguardando aceite do contratante
                      </Text>

                      <Text style={styles.timelineDescription}>
                        {contratacao.status === 'Confirmado' ||
                        contratacao.status === 'Concluido'
                          ? 'Etapa demonstrativa'
                          : 'Aguardando confirmação'}
                      </Text>
                    </View>
                  </View>

                  {contratacao.status === 'Concluido' && (
                    <View style={styles.timelineItem}>
                      <View style={styles.timelineMarker}>
                        <CheckCircle2
                          size={20}
                          color="#27AE60"
                        />
                      </View>

                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineTitle}>
                          Serviço concluído
                        </Text>

                        <Text style={styles.timelineDescription}>
                          Contratação finalizada
                        </Text>
                      </View>
                    </View>
                  )}

                </View>
              </View>

              {/* Botão de mensagem */}
              <Pressable
                style={({ pressed }) => [
                  styles.messageButton,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={enviarMensagem}
              >
                <MessageCircle
                  size={19}
                  color="#FFFFFF"
                />

                <Text style={styles.messageButtonText}>
                  Enviar mensagem
                </Text>
              </Pressable>

            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.mainBg,
      ...Platform.select({
        web: {
          height: '100vh',
          overflow: 'hidden',
        },
      }),
    },

    dashboardContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.mainBg,
    },

    mainContent: {
      flex: 1,
      backgroundColor: theme.mainBg,
      ...Platform.select({
        web: {
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        },
      }),
    },

    scrollView: {
      flex: 1,
    },

    scrollContent: {
      flexGrow: 1,
    },

    contentWrapper: {
      width: '100%',
      maxWidth: 1050,
      alignSelf: 'center',
      paddingHorizontal: 32,
      paddingTop: 22,
      paddingBottom: 40,
    },

    topNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
    },

    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      paddingVertical: 8,
    },

    backButtonText: {
      fontSize: 14,
      color: theme.textSecondary,
      fontWeight: '500',
    },

    closeButton: {
      padding: 8,
    },

    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 22,
      marginBottom: 30,
    },

    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      alignItems: 'center',
      justifyContent: 'center',
    },

    profileInfo: {
      flex: 1,
      gap: 7,
    },

    artistName: {
      fontSize: 25,
      fontWeight: '700',
      color: theme.textPrimary,
    },

    artistCategory: {
      fontSize: 15,
      color: theme.textSecondary,
    },

    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 17,
      paddingVertical: 7,
      borderRadius: 22,
      marginTop: 3,
    },

    statusText: {
      fontSize: 13,
      fontWeight: '700',
    },

    summaryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      backgroundColor: theme.cardBg,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: theme.borderColor,
      padding: 20,
      marginBottom: 28,
      gap: 15,
    },

    summaryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      minWidth: 145,
      gap: 12,
    },

    summaryTextContainer: {
      flex: 1,
    },

    summaryValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    summaryLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },

    summaryDivider: {
      width: 1,
      height: 38,
      backgroundColor: theme.borderColor,
    },

    section: {
      marginBottom: 27,
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 15,
    },

    description: {
      fontSize: 14,
      lineHeight: 23,
      color: theme.textSecondary,
    },

    participantsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 14,
    },

    participantCard: {
      flex: 1,
      minWidth: 220,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
      padding: 16,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: theme.borderColor,
      backgroundColor: theme.cardBg,
    },

    initialAvatar: {
      width: 43,
      height: 43,
      borderRadius: 22,
      backgroundColor: '#34434A',
      alignItems: 'center',
      justifyContent: 'center',
    },

    participantArtistAvatar: {
      width: 43,
      height: 43,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },

    participantInfo: {
      flex: 1,
    },

    participantRole: {
      fontSize: 11,
      color: theme.textSecondary,
      marginBottom: 4,
    },

    participantName: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    participantEmail: {
      fontSize: 11,
      color: theme.textSecondary,
      marginTop: 4,
    },

    conditionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
      marginBottom: 17,
      flexWrap: 'wrap',
    },

    conditionLabel: {
      fontSize: 13,
      color: theme.textSecondary,
      flex: 1,
    },

    conditionValue: {
      fontSize: 13,
      color: theme.textPrimary,
      fontWeight: '500',
    },

    timeline: {
      marginTop: 3,
    },

    timelineItem: {
      flexDirection: 'row',
      minHeight: 72,
    },

    timelineMarker: {
      width: 28,
      alignItems: 'center',
      marginRight: 12,
    },

    timelineContent: {
      flex: 1,
      paddingBottom: 19,
    },

    timelineTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    timelineDescription: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 5,
    },

    messageButton: {
      minHeight: 50,
      backgroundColor: '#E65340',
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginTop: 5,
    },

    messageButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '700',
    },

    notFound: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 25,
      gap: 20,
    },

    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.textPrimary,
    },
  });

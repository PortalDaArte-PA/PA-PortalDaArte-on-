
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Music,
  Headphones,
  Mic,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

type IconType = typeof Music;

export type Contratacao = {
  id: string;
  name: string;
  category: string;
  date: string;
  location: string;
  status: string;
  icon: IconType;
  darkBgColor: string;
  lightBgColor: string;
  iconColor: string;
};

type Props = {
  item: Contratacao;
};

function getStatusColor(status: string) {
  switch (status) {
    case 'Pendente':
      return '#F2994A';
    case 'Confirmado':
      return '#56CCF2';
    case 'Concluido':
      return '#27AE60';
    default:
      return '#BDBDBD';
  }
}

export default function CardContratacao({ item }: Props) {
  const { theme, isLightMode } = useTheme();
  const IconComponent = item.icon;

  const avatarBg = isLightMode
    ? item.lightBgColor
    : item.darkBgColor;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.cardBg,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    cardLeftGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      flexShrink: 1,
    },
    avatarContainer: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    artistDetails: {
      justifyContent: 'center',
      flexShrink: 1,
    },
    nameCategoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      flexWrap: 'wrap',
    },
    artistName: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.textPrimary,
      marginRight: 8,
    },
    artistCategory: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    infoText: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    cardRightGroup: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginLeft: 12,
    },
    statusBadge: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: getStatusColor(item.status),
    },
    statusText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '700',
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardLeftGroup}>
        <View
          style={[
            styles.avatarContainer,
            { backgroundColor: avatarBg },
          ]}
        >
          <IconComponent size={24} color={item.iconColor} />
        </View>

        <View style={styles.artistDetails}>
          <View style={styles.nameCategoryRow}>
            <Text style={styles.artistName}>
              {item.name}
            </Text>

            <Text style={styles.artistCategory}>
              {item.category}
            </Text>
          </View>

          <Text style={styles.infoText}>
            {item.date}
          </Text>

          <Text style={styles.infoText}>
            {item.location}
          </Text>
        </View>
      </View>

      <View style={styles.cardRightGroup}>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

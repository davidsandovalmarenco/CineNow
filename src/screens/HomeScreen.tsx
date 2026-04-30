import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { MovieCard } from '../components/MovieCard';

// Using the data from the mockup
const HERO_MOVIE = {
  title: 'Marea Galáctica: El Origen',
  description: 'Una odisea visual que desafía los límites del tiempo y el espacio en una experiencia cinematográfica sin precedentes.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm6TTIVRqH5yhnnqUG01VM2EJGK-qrwWBj1INNMZU3jwqgfXZvF_8HsJXPISunI55WykKZLXxAe823jGxc60nhGNJMOYjyw916WEYmYOamSZ_xys1zWCEa8rLZK9WqiqhI-P2oiesUzLgSqNBEFSOit1Tw_zUxKUuw_0r2dAhJ1Un0JOOlwYdqwE7AjUKw6LndrUcC0l-hp-l9NHvQSkCHJxe9vJkc0rZ9QLh8hznEXiLM0lk-x2inO2vJ6ITAMDZ7CpRziac8GpU',
};

const ESTRENOS = [
  {
    id: '1',
    title: 'Código Sombra',
    genre: 'Acción • Thriller',
    rating: 8.9,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUeXsl9PzchDEoLLQkhKy4G_fCE6FrMjs7IjTihmhGNq8CFJ3lrVXQEi-DwByLG5i_vioM1ZOAUY6DF9c_Dt7I4989sM9lchTSr3rVrDYg5E3Rvo0oHDSbf9uTjytvIEFkFItMX5NgkqSRKkosMRY9dLh71Er3MXlHS3nd3z2Mo8SIWsnyo8vxPlq7ILfbDnKN57aUnm2tDa71yCl1YJTbx1PYiT1rd4B3_tQJB5TaCj5v8cFlhoVArDy2qIN4TNf-lnTimDYymfA',
  },
  {
    id: '2',
    title: 'Tierras de Cristal',
    genre: 'Fantasía • Animación',
    rating: 9.2,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmIzVJbOovIYYyld0MDLvH0BAa2er5mvTyLy7Mkipd_IHOe7-fC-R7lRgiJQbcQA6-i4mrETXqM_66QVd7tnwSsRCsPHwe18T1Yd8pCOLB7m_yVrW0DjDrqDHJWfqiOWAUp7m5rlMGnmiPREPovsf454uk1_zXKI0asux0eHBHe29kUVZU4u5VddpXlhgofngOPYVtmhIyhyeOfRMpM4jQFtLO72kMlu2H3xgFQAoILX7WWXZH6QoscxzfS1PoSWhA0WuFAVur1oA',
  },
  {
    id: '3',
    title: 'El Susurro del Olvido',
    genre: 'Horror • Suspenso',
    rating: 7.5,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhIU46gweMcxDxtmAzX62CQPhg7xCwo1HkK5dtd_rWBwT2twcn8OeUNXWK1_6Vw92I2mje9GWuvlIor-RnexlmwuY-gZZXItUbZwZCoErXalaDb-j-geUs0V2v7-5gHbey257S7f7lM0njVbWzx7ihYRfyIMg3qAmw4GIlzeN1ChZCAjIQ8OCCMlky3jtMth57CIZd-li15PAgxo8Dpw-lXPySIqGY9BmG3F-1md6QoM2FBtTNbw79Kj8nm8lJV04C_OkxLdzowPs',
  }
];

const UPCOMING = [
  {
    id: 'u1',
    title: 'Relatos de Oro',
    date: '24 DE JUNIO',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS_XpT546AaYfD3v2VCRVbZPoUtjXr1ic_nyEdS8EUwsjYc8E2ZeAK9AAjbOEXc9GVavflgPXVl4_9MO3KEs9tDz9Zf-q_zdGxZ4SjU1m6hHrHMAatn-2H0CssR_QWCuS-hW7m6SOmK23hYLiVLpY2XEYAwiyqdLN7SSAc4Qoi-NOZjnJ8zow99BQ8kXP4OaB047SswoAMe__R5V3JR8IfbM79xlp8-2Pg3FadTPV3rGHX48q4VwNmqSRiyTIb5n_W6uM4ERpFH14',
  },
  {
    id: 'u2',
    title: 'Horizonte Perdido',
    date: '12 DE JULIO',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIQAUAQXsbC8I_2xE2898h-HIP0hDOV0afdUUiCeVp-vsuEHGXE_TDa7s93vIsPwR3h7R5yo54XxSH_YZ96mOs2u6eHkwujEnlK9V_GlSwfGq37yiEJQVv3gulqY0AqS_gvOhs9aS3uDrPJG_SSF0cQB5veUOYNv9VlOmJJqbC2bllWs1ouX0fXBg3DWsfXWax0nDg7n4_EgqhHfMFuAdSbhXofwnFa1eeNGk7bPbvfcj2ERogrPm6btJN71jQ6YAPX_qwnrKa8QI',
  }
];

const IN_THEATERS = [
  {
    id: 't1',
    title: 'Velocidad Terminal',
    description: 'Cuando el tiempo es el único enemigo, cada segundo cuenta para sobrevivir.',
    duration: '1h 55m',
    rating: 4.8,
    tags: ['4K', 'SUB'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLa_YWoPgDMBBDEtEu8vTdsa5dvzpIw7SSXFw_dIV9b4Xz1Lgxhn8f5JXXJGg892g7mrqhZl231MlgqIdPzBB5T8AnbN9NEuTu4mtRQWnfIDEZrz1D0Yd_PijCsnlNIFvfIkmZ4jXNFiRKmxQHY9JiVCl7EJaPTpKG-S1u-x_aS2_yWb0H4qJUsZ9qEzQRmAibAmJTJbIgrCyzPd7wYneBpnrjAJiGJxogD0bzg9sgOc8c2xjsxEitsaN6t98NgD4oi9cQr8k1S4E',
  },
  {
    id: 't2',
    title: 'Sombras en la Ciudad',
    description: 'Un detective retirado debe enfrentar su pasado más oscuro.',
    duration: '2h 10m',
    rating: 4.5,
    tags: ['ATMOS', 'DOB'],
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZcD7Az8VBPI9hewtbxLZ39oIiKU87v0LT3NSBbmFgHK0gdNHoZ_gTFcQm7JIz-llP4cRH68K7yuFmlEi_nLqtle9rO_9kzKq2tdkdwwVJk5mWUroBG0FHw0fG5rFeR5f_P3gImC28CYxjIKin-D2YFv0PLuQQyYVRw0mIVL_w4p2TbQxJfFOtHicpWfGEBDG1zbd_94mkt-jXJq7R3emNJo4gtoD9XgSf5MYTzBwIQYj4pIM0Ld2yIPUzGQpNXfE9G2qsqJDK88U',
  }
];

const { width } = Dimensions.get('window');
const HERO_HEIGHT = width * 1.5; // Roughly matches the 751px height in mockup

export const HomeScreen = ({ navigation }: any) => {

  const handleMoviePress = (movie: any) => {
    navigation.navigate('MovieDetail', { movie });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* TopAppBar */}
      <BlurView intensity={80} tint="dark" style={styles.header}>
        <SafeAreaView style={styles.headerSafeArea}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="film" size={24} color={colors.primaryContainer} />
              <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>CineNow</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileTab')}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4hJZVmd5HnlS1UNp7P-Sth4b--grJxAB1L09UWN7Ay3vZLB6a962sCmUw0csTsIYvEYG7nIYy-A3p7uZ5GqsORD2JopGnu0SqWQovUmT4xVtSjxbDY-VdqZ07bVNp0UBnnwFC7rVBDjaOUOYP8WlrW01tJ_mCQwfp4_bb85NJicyiKMwTFRZLx8vd82IyKTXvIGQr2xwnFoYt33sWHl7O5BEMyZWpz6CTo9_mQoNSzsVXynBAfBxJ7sLP8TN9gfiswoF13qeUMJI' }} 
                style={styles.profileImg}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: HERO_MOVIE.imageUrl }} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(13, 13, 13, 0.8)', '#0D0D0D']}
            locations={[0, 0.7, 1]}
            style={styles.heroGradient}
          />
          
          <View style={styles.heroContent}>
            <View style={styles.badgesRow}>
              <View style={styles.badgePrimary}>
                <Text style={styles.badgeTextPrimary}>IMAX</Text>
              </View>
              <BlurView intensity={40} tint="light" style={styles.badgeSecondary}>
                <Text style={styles.badgeTextSecondary}>ESTRENO</Text>
              </BlurView>
            </View>
            
            <Text style={[typography.h1, styles.heroTitle]}>{HERO_MOVIE.title}</Text>
            <Text style={[typography.bodyMd, styles.heroDesc]}>{HERO_MOVIE.description}</Text>
            
            <View style={styles.heroActions}>
              <TouchableOpacity 
                style={styles.btnReserve} 
                onPress={() => handleMoviePress(HERO_MOVIE)}
                activeOpacity={0.8}
              >
                <Ionicons name="ticket" size={20} color={colors.onPrimaryContainer} />
                <Text style={styles.btnReserveText}>Reserve Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btnTrailer} activeOpacity={0.8}>
                <Text style={styles.btnTrailerText}>Trailer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Estrenos */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={typography.h2}>Estrenos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
            {ESTRENOS.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie as any} 
                onPress={handleMoviePress} 
                width={176} // w-44 equivalent
              />
            ))}
          </ScrollView>
        </View>

        {/* Próximamente */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={typography.h2}>Próximamente</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
            {UPCOMING.map(movie => (
              <TouchableOpacity key={movie.id} style={styles.upcomingCard} activeOpacity={0.9}>
                <Image source={{ uri: movie.imageUrl }} style={styles.upcomingImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.upcomingGradient}
                />
                <View style={styles.upcomingContent}>
                  <Text style={styles.upcomingDate}>{movie.date}</Text>
                  <Text style={[typography.h3, { color: '#fff' }]}>{movie.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* En cartelera */}
        <View style={[styles.sectionContainer, { marginBottom: spacing.xl * 2 }]}>
          <Text style={[typography.h2, { marginBottom: spacing.md, paddingHorizontal: spacing.containerMargin }]}>
            En cartelera
          </Text>
          
          <View style={{ paddingHorizontal: spacing.containerMargin, gap: spacing.md }}>
            {IN_THEATERS.map(movie => (
              <TouchableOpacity 
                key={movie.id} 
                style={styles.listCard} 
                onPress={() => handleMoviePress(movie)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: movie.posterUrl }} style={styles.listPoster} />
                <View style={styles.listInfo}>
                  <View style={styles.listTagsRow}>
                    <Text style={styles.listTagPrimary}>{movie.tags[0]}</Text>
                    <Text style={styles.listTagSecondary}>{movie.tags[1]}</Text>
                  </View>
                  <Text style={[typography.h3, { marginBottom: 4 }]} numberOfLines={1}>{movie.title}</Text>
                  <Text style={[typography.bodyMd, { marginBottom: spacing.md }]} numberOfLines={1}>{movie.description}</Text>
                  
                  <View style={styles.listMetaRow}>
                    <Ionicons name="time-outline" size={14} color={colors.primaryContainer} />
                    <Text style={styles.listMetaText}>{movie.duration}</Text>
                    <Ionicons name="star" size={14} color={colors.primaryContainer} style={{ marginLeft: spacing.sm }} />
                    <Text style={styles.listMetaText}>{movie.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerSafeArea: {
    backgroundColor: 'transparent',
  },
  headerContent: {
    height: 64, // h-16
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.containerMargin,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoText: {
    color: colors.primaryContainer,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for BottomTab
  },
  heroContainer: {
    height: HERO_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badgePrimary: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeTextPrimary: {
    color: colors.onPrimaryContainer,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  badgeSecondary: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  badgeTextSecondary: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  heroTitle: {
    maxWidth: '90%',
  },
  heroDesc: {
    maxWidth: 320,
    marginBottom: spacing.xs,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.base,
  },
  btnReserve: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  btnReserveText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  btnTrailer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
  },
  btnTrailerText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.containerMargin,
  },
  seeAllText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  horizontalScrollPadding: {
    paddingHorizontal: spacing.containerMargin,
  },
  upcomingCard: {
    width: 288, // w-72
    height: 160, // h-40
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: spacing.md,
  },
  upcomingImage: {
    width: '100%',
    height: '100%',
  },
  upcomingGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  upcomingContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: spacing.md,
  },
  upcomingDate: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  listPoster: {
    width: 96, // w-24
    aspectRatio: 2 / 3,
    borderRadius: borderRadius.default,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  listTagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: 4,
  },
  listTagPrimary: {
    color: colors.primaryContainer,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  listTagSecondary: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  listMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listMetaText: {
    color: colors.onSurface,
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});

import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const libraryItems = [
  { id: '1', title: 'Liked Songs', type: 'Playlist', count: 248, icon: 'favorite', gradient: ['#450af5', '#c4efd9'], pinned: true },
  { id: '2', title: 'Late Night Vibes', type: 'Playlist', count: 34, icon: 'music-note', gradient: ['#1e3264', '#e8115b'] },
  { id: '3', title: 'Morning Energy', type: 'Playlist', count: 18, icon: 'wb-sunny', gradient: ['#477d95', '#e8d44d'] },
  { id: '4', title: 'Workout Mix', type: 'Playlist', count: 52, icon: 'mic', gradient: ['#27856a', '#1e3264'] },
  { id: '5', title: 'Midnights', type: 'Album', artist: 'Taylor Swift', icon: 'album', gradient: ['#7358ff', '#fc3c44'] },
  { id: '6', title: 'SOS', type: 'Album', artist: 'SZA', icon: 'album', gradient: ['#ff6437', '#fecc02'] },
]

const filters = ['Playlists', 'Albums', 'Artists', 'Podcasts']

const Library = () => {
  const [activeFilter, setActiveFilter] = useState('Playlists')
  const [isGrid, setIsGrid] = useState(true)

  const GridCard = ({ item }) => (
    <TouchableOpacity style={{ width: '48%', marginBottom: 12 }}>
      <LinearGradient colors={item.gradient} style={{
        aspectRatio: 1, borderRadius: 6,
        alignItems: 'center', justifyContent: 'center'
      }}>
        <MaterialIcons name={item.icon} size={52} color="rgba(255,255,255,0.9)" />
        {item.pinned && (
          <View style={{
            position: 'absolute', bottom: 6, right: 6,
            backgroundColor: '#1db954', borderRadius: 12,
            width: 22, height: 22, alignItems: 'center', justifyContent: 'center'
          }}>
            <MaterialIcons name="push-pin" size={12} color="#000" />
          </View>
        )}
      </LinearGradient>
      <Text style={{ color: '#fff', fontWeight: '600', fontSize: 13, marginTop: 6 }} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={{ color: '#b3b3b3', fontSize: 11, marginTop: 2 }} numberOfLines={1}>
        {item.type}{item.count ? ` · ${item.count} songs` : item.artist ? ` · ${item.artist}` : ''}
      </Text>
    </TouchableOpacity>
  )

  const ListItem = ({ item }) => (
    <TouchableOpacity style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 8,
      width: '100%',
      alignSelf: 'stretch',
    }}>
      <LinearGradient colors={item.gradient} style={{
        width: 54, height: 54, borderRadius: 4,
        alignItems: 'center', justifyContent: 'center'
      }}>
        <MaterialIcons name={item.icon} size={26} color="rgba(255,255,255,0.9)" />
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ color: '#b3b3b3', fontSize: 12, marginTop: 2 }} numberOfLines={1}>
          {item.type}{item.count ? ` · ${item.count} songs` : item.artist ? ` · ${item.artist}` : ''}
        </Text>
      </View>
      <MaterialIcons name="more-vert" size={20} color="#b3b3b3" />
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>

      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 18,
      }}>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: '700' }}>Library</Text>
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <MaterialIcons name="search" size={27} color="#fff" />
          <MaterialIcons name="add" size={27} color="#fff" />
          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="person" size={32} color="#121212" />
          </View>
        </View>
      </View>

      {/* Filter chips */}
      <View style={{ height: 40 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            alignItems: 'center',
            height: 40,
          }}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={{
                backgroundColor: activeFilter === f ? '#fff' : '#2a2a2a',
                borderRadius: 20,
                paddingHorizontal: 12,
                height: 28,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ color: activeFilter === f ? '#121212' : '#fff', fontSize: 13, fontWeight: '500' }}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* View toggle */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialIcons name="access-time" size={14} color="#b3b3b3" />
          <Text style={{ color: '#b3b3b3', fontSize: 13 }}>Recents</Text>
          <MaterialIcons name="keyboard-arrow-down" size={16} color="#b3b3b3" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity>
            <MaterialIcons name='search' size={22} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGrid(g => !g)}>
            <MaterialIcons name={isGrid ? 'format-list-bulleted' : 'grid-view'} size={22} color="#b3b3b3" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {isGrid ? (
        <FlatList
          key="grid"
          data={libraryItems}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => <GridCard item={item} />}
        />
      ) : (
        <FlatList
          key="list"
          data={libraryItems}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
            flexDirection: 'column',
          }}
          renderItem={({ item }) => <ListItem item={item} />}
        />
      )}

    </View>
  )
}

export default Library
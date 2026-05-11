// import { MaterialIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { FlatList, Image, TouchableOpacity, View } from 'react-native';

// const album = {
//   name: "HARDSTONE PSYCHO",
//   artist: "Don Toliver",
//   cover: require('../../assets/images/d.png'),
//   songs: [
//     { id: '1', title: 'HARDSTONE PSYCHO', artist: 'Don Toliver', duration: '2:57' },
//     { id: '2', title: 'BROTHER STONE', artist: 'Don Toliver, Kodak Black', duration: '3:14' },
//     { id: '3', title: 'LOST IN THE REAL', artist: 'Don Toliver', duration: '3:02' },
//     { id: '4', title: 'ATTITUDE', artist: 'Don Toliver', duration: '2:48' },
//     { id: '5', title: 'BACK ON MY BULLSH*T', artist: 'Don Toliver', duration: '3:21' },
//     { id: '6', title: 'BANDIT', artist: 'Don Toliver', duration: '2:55' },
//     { id: '7', title: 'PSYCHO', artist: 'Don Toliver', duration: '3:10' },
//     { id: '8', title: 'SMOKE', artist: 'Don Toliver', duration: '2:44' },
//     { id: '9', title: 'PRIVATE LANDING', artist: 'Don Toliver, Justin Bieber, Future', duration: '3:33' },
//     { id: '10', title: 'DRIVE', artist: 'Don Toliver', duration: '3:05' },
//     { id: '11', title: 'AFTER PARTY', artist: 'Don Toliver', duration: '2:38' },
//     { id: '12', title: 'NUMB', artist: 'Don Toliver', duration: '3:17' },
//     { id: '13', title: 'OUTERSPACE', artist: 'Don Toliver', duration: '3:44' },
//     { id: '14', title: 'LONESTAR', artist: 'Don Toliver', duration: '3:28' },
//     { id: '15', title: 'WHOA', artist: 'Don Toliver', duration: '2:51' },
//   ]
// };

// export default function AlbumPage() {
//   const router = useRouter();

//   const openPlayer = (song) => {
//     router.push({
//       pathname: '/player',
//       params: {
//         title: song.title,
//         artist: song.artist,
//       }
//     });
//   };

//   return (
//     <View className="w-full h-full bg-black">
//       <FlatList
//         data={album.songs}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 120 }}

//         ListHeaderComponent={() => (
//           <View className="w-full items-center justify-center">

//             {/* ARTWORK BACKGROUND */}
//             <View style={{ width: '100%', aspectRatio: 1, position: 'relative' }}>
//               <Image
//                 source={album.cover}
//                 style={{ width: '100%', height: '100%' }}
//                 resizeMode="cover"
//               />

//               {/* BACK BUTTON overlaid on image */}
//               <View className="absolute top-10 left-0 right-0 flex-row items-center justify-between px-4">
//                 <TouchableOpacity onPress={() => router.back()}>
//                   <MaterialIcons name="arrow-back" size={26} color="white" />
//                 </TouchableOpacity>
//                 <View className="flex-row items-center gap-4">
//                   <MaterialIcons name="share" size={22} color="white" />
//                   <MaterialIcons name="more-vert" size={22} color="white" />
//                 </View>
//               </View>
//             </View>

            

            

//           </View>
//         )}

     

       
//       />
//     </View>
//   );
// }
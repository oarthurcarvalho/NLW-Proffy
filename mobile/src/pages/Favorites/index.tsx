import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, ScrollView, AsyncStorage } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

const Favorites = () => {
    const [favorites, setFavorites] = useState([])

    async function getFavorites() {
        const favoriteds = await AsyncStorage.getItem('favorites')

        if (favoriteds) {
            const favoritedTeachers = JSON.parse(favoriteds)

            setFavorites(favoritedTeachers)
        }
    }

    useFocusEffect(() => {
        getFavorites()
    })

    return (

        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }} >

                {favorites.map((teacher: Teacher) => {
                    if (teacher) {
                        return (
                            <TeacherItem
                                key={teacher.id}
                                teacher={teacher}
                                favorited
                            />)
                    }

                })}

            </ScrollView>
        </View>
    )
}

export default Favorites
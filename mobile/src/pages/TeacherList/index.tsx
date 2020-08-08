import React, { useState, useEffect } from 'react'
import styles from './styles'
import { View, Text, ScrollView, TextInput } from 'react-native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

const TeacherList = () => {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [favorites, setFavorites] = useState<number[]>([])
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function handleSubmit() {
        getFavorites()
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
        setTeachers(response.data)
        setIsFiltersVisible(false)
    }

    async function getFavorites() {
        const favoriteds = await AsyncStorage.getItem('favorites')

        if (favoriteds) {
            const favoritedTeachers = JSON.parse(favoriteds)
            const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                if (teacher) {
                    return teacher.id
                }
            })
            setFavorites(favoritedTeachersIds)
        }
    }
  


   
    return (

        <View style={styles.container}>
            <PageHeader
                title="Proffys disponiveis"
                headerRight={
                    <BorderlessButton onPress={() => setIsFiltersVisible(!isFiltersVisible)}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                }
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder='Qual sua materia'
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Qual o dia'
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Qual o horario'
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }} >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )

                }
                )}

            </ScrollView>
        </View>
    )
}

export default TeacherList
import React, { useState, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api'

export default function Gastos() {
    const navigation = useNavigation();
    const [gastos, setGastos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadGastos() {

        if (loading) {
            return;
        }

        if (total > 0 && gastos.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`gastos?page=${page}`);

        setGastos([...gastos, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadGastos();
    }, [])

    function navigateToDetail(gasto) {
        navigation.navigate('Detalhes', { gasto });
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} gastos.</Text>
                </Text>
            </View>


            <FlatList
                onEndReached={loadGastos}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                keyExtractor={gasto => String(gasto.id)}
                style={styles.gastosList}
                data={gastos}
                renderItem={({ item: gasto }) =>
                    (<View style={styles.gastos}>
                        <Text style={styles.gastosProperty}>Usuário:</Text>
                        <Text style={styles.gastosValue}>{gasto.nome}</Text>

                        <Text style={styles.gastosProperty}>Gasto:</Text>
                        <Text style={styles.gastosValue}>{gasto.gasto}</Text>

                        <Text style={styles.gastosProperty}>Data:</Text>
                        <Text style={styles.gastosValue}>{gasto.data}</Text>

                        <Text style={styles.gastosProperty}>Valor:</Text>
                        <Text style={styles.gastosProperty}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gasto.valor)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(gasto)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes...</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>)} />



        </View>
    )
}
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'

export default function Detalhes() {

    const navigation = useNavigation();
    const message = "Olá, estou testando o meu aplicativo em React Native."
    const route = useRoute();
    const gasto = route.params.gasto;
    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject:`Gasto: ${gasto.gasto}`,
            recipients: ['ureta.aguiar@gmail.com'],
            body:message,

        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=+5571989393033&text=${message}`)
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Image source={logoImg} />

                <TouchableOpacity
                    onPress={navigateBack}>
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#e02041" />
                </TouchableOpacity>

            </View>

            <View style={styles.gasto}>

                <Text style={[styles.gastosProperty, { marginTop: 0 }]}>Usuário:</Text>
                <Text style={styles.gastosValue}>{gasto.nome}</Text>

                <Text style={styles.gastosProperty}>Gasto:</Text>
                <Text style={styles.gastosValue}>{gasto.gasto}</Text>

                <Text style={styles.gastosProperty}>Data:</Text>
                <Text style={styles.gastosValue}>{gasto.data}</Text>

                <Text style={styles.gastosProperty}>Valor:</Text>
                <Text style={styles.gastosProperty}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(gasto.valor)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Gaste Menos</Text>
                <Text style={styles.heroTitle}>E menos ainda</Text>

                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={ sendWhatsapp }>
                        <Text style={styles.actionText}>
                            Whatsapp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
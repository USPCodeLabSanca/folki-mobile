import styled from "styled-components/native";
import { TouchableOpacity, Linking } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Paragraph from "../Paragraph";
import theme from "../../config/theme";
import React from "react";


const ContactRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const ContactInfo = styled.View`
  flex: 1;
  gap: 8px;
`;

const ContactImage = styled.Image`
  width: 96px;
  height: 96px;
  border-radius: 48px;
`;

const ContactView = styled.View`
  width: 330px;
  margin-bottom: 24px;
`;

const IconsView = styled.View`
  flex-direction: row;
  gap: 12px;
`;


type ContactCardProps = {
  name: string;
  role: string;
  img: string;
  email?: string;
  website?: string;
  linkedin?: string;
};

function ContactCard( props: ContactCardProps ) {
  return (
    <ContactView>
      <ContactRow>
        <ContactImage
          source={{
            uri: props.img,
          }}
        />

        <ContactInfo>
          <Paragraph
            style={{
              color: '#FFFFFF',
              marginBottom: 0,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {props.name}
          </Paragraph>

          <Paragraph
            style={{
              color: theme.colors.gray.gray5,
              marginBottom: 4,
              fontSize: 13,
            }}
          >
            {props.role}
          </Paragraph>

          <IconsView>
            <TouchableOpacity
              onPress={() => Linking.openURL(props.website!)}
            >
              <Ionicons name="globe-outline" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(props.email!)}
            >
              <Ionicons name="mail" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(props.linkedin!)}
            >
              <Ionicons name="logo-linkedin" size={22} color="white" />
            </TouchableOpacity>
          </IconsView>
        </ContactInfo>
      </ContactRow>
    </ContactView>
  );
};

export default ContactCard;

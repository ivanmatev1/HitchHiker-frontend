import { acceptRequest, denyRequest, getRoute, getUser, postRouteRequest, removeUser } from '@/app/components/requestHandler';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Toast from 'react-native-toast-message';

export async function fetchRoute(id: any, setRoute: Dispatch<SetStateAction<any>>, setRole: Dispatch<SetStateAction<string>>) {
    try {
        if (typeof id === 'string') {
            const route = await getRoute(id);
            setRoute(route); 

            const user = await getUser();
            if (route.creator.id === user.id) {
                setRole("creator");
            } else if (route.participants.some((participant: { id: string }) => participant.id === user.id)) {
                setRole("participant");
            } else {
                setRole("viewer");
            }

        }
    } catch (error) {
        console.error('Failed to fetch route:', error);
    }

};

export async function handleRequestToJoin(id: any) {
    try {
        await postRouteRequest(+id);
        Toast.show({
            type: 'success',
            text1: 'Request sent successfully',
        });
    } catch (error) {
        console.error('Failed to post request:', error);
    }
}


export async function kickParticipant(userId: number, id: any, setRoute: Dispatch<SetStateAction<any>>, setRole: Dispatch<SetStateAction<string>>) {
    try {
        await removeUser(userId, +id);
        fetchRoute(id, setRoute, setRole);
    } catch (error) {
        console.error('Failed to deny request:', error);
    }
}

export async function handleAcceptRequest(routeId: any, id: number, setRoute: Dispatch<SetStateAction<any>>, setRole: Dispatch<SetStateAction<string>>) {
    try {
        await acceptRequest(id.toString());
        fetchRoute(routeId, setRoute, setRole);
    } catch (error) {
        console.error('Failed to accept request:', error);
    }
}

export async function handleDenyRequest(routeId: any, id: number, setRoute: Dispatch<SetStateAction<any>>, setRole: Dispatch<SetStateAction<string>>) {
    try {
        await denyRequest(id.toString());
        fetchRoute(routeId, setRoute, setRole);
    } catch (error) {
        console.error('Failed to deny request:', error);
    }
}
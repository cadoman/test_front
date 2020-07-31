import React, { useState, useEffect } from 'react'
import { Museum } from '../interfaces/museum'
import { useParams } from 'react-router'
import { MuseumAPI } from '../api/museum-api'
import { catchError } from 'rxjs/operators'
import { of } from 'rxjs'
export const MuseumDetails: React.FC = () => {
    const [museum, setMuseum] = useState<Museum>(undefined)
    const [networkError, setNetworkError] = useState<boolean>(false)
    const { refMusee } = useParams();

    useEffect(() => {
        MuseumAPI.getMuseum(refMusee).pipe(
            catchError(e => {
                console.error(e);
                setNetworkError(true);
                return of(undefined);
            })
        ).subscribe(m => setMuseum(m))
    }, [refMusee])

    useEffect(() => {
        if (museum) {
            document.title = museum.nom_du_musee
        }
    }, [museum])

    return museum ? (
        <section>
            <h1>{museum.nom_du_musee}</h1>
            <h3>{museum.ville} ({museum.departement})</h3>
            <h2>Adresse</h2>
            <ul>
                <li>
                    Adresse : {museum.adr}
                </li>
                <li>
                    Code Postal : {museum.cp}
                </li>
                <li>
                    Ville : {museum.ville}
                </li>
                <li>
                    Département : {museum.departement}
                </li>
                <li>
                    Région : {museum.region}
                </li>
                {museum.coordonnees_finales &&
                    <li>
                        GPS : {museum.coordonnees_finales.lat}, {museum.coordonnees_finales.lon}
                    </li>
                }
            </ul>
            <h2>Coordonnées</h2>
            <ul>
                <li>
                    Site web : {museum.sitweb}
                </li>
                <li>
                    Téléphone : {museum.telephone1}
                </li>
                <li>
                    Fax : {museum.fax}
                </li>
            </ul>
            <h2>Infos pratique</h2>
            <ul>
                <li>
                    Fermeture annuelle : {museum.fermeture_annuelle}
                </li>
                <li>
                    Jours nocturne : {museum.jours_nocturnes}
                </li>
                <li>
                    Période d'ouverture : {museum.periode_ouverture}
                </li>
            </ul>
            <h2>Autres</h2>
            <ul>
                <li>
                    Date d'appellation : {museum.date_appellation}
                </li>
                <li>
                    Appellation retirée par le haut conseil le {museum.date_retrait_appellation_par_haut_conseil}
                </li>
            </ul>
        </section>

    )
        : networkError ? <p>Erreur : impossible de charger les informations du musée</p> :
            <p>Chargement...</p>
}
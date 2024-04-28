import pandas as pd
import numpy as np
import requests


# Esta funcion hace un request a spotify para obtener mas detalles de las cancioens que un usuario sigue
def getTrackFeatures(tracks, auth):
    # First, make the string for url
    ids = [track['id'] for track in tracks if 'name' in track]
    track_ids = 'ids=' + ','.join(ids)

    # Preparacion del url
    url = "https://api.spotify.com/v1/audio-features"
    headers = {
        "Authorization": auth
    }

    params = {
        "ids": track_ids
    }

    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        # print(response.json())
        response = response.json()['audio_features']
        response.pop(0)
        return response
    else:
        print(f"Failed to retrieve data: {response.status_code}")
        print(f"Failed to retrieve data: {response.text}")

    return False


def getUserMetrics(data, auth):

    track_details = getTrackFeatures(data, auth)
    if not track_details: # En caso de fallar, regresar False
        return False

    # Convertir los detalles a un dataframe
    tracks_df = pd.DataFrame(track_details)
    # print(tracks_df.dtypes)

    # Convertir a un dataframe data
    data_df = pd.DataFrame(data)

    # Hacer un join
    merged = pd.merge(data_df, tracks_df, on='id', how='inner')
    result = main_analysis(merged)

    return result

# Esta funcion recibe el dataframe del usuario listo para analizar con el que detallamos en jupyter
def main_analysis(user_df):

    # ---- A partir de aqui, analizaremos algunas columna con base en lo que escucha el usuario ----

    # Obtener el danceability promedio
    avg_danceability_user = user_df['danceability'].mean()
    print("Danceability", avg_danceability_user)

    # Obtener el energy promedio
    avg_energy_user = user_df['energy'].mean()
    print("Energy", avg_energy_user)

    # Obtener el valence promedio
    avg_valence_user = user_df['valence'].mean()
    print("Valence", avg_valence_user)

    # Obtener el loudness promedio
    avg_loudness_user = user_df['loudness'].mean()
    print("Loudness", avg_loudness_user )

    

    # ---- Hacer lo mismo que para el usuario pero con las canciones más escuchadas ------------

    df = pd.read_csv('dataset.csv', index_col=0)
    # Realizar el conteo de las filas con valores nulos
    df.isnull().sum()

    # Al no ser tantas, podemos eliminar aquellas filas con valores nulos. Usamos In Place
    df.dropna(inplace = True)

    # Obtener el danceability promedio
    avg_danceability_spotify = df['danceability'].mean()
    print("Danceability", avg_danceability_spotify)

    # Obtener el energy promedio
    avg_energy_spotify = df['energy'].mean()
    print("Energy", avg_danceability_spotify)

    # Obtener el valence promedio
    avg_valence_spotify = df['valence'].mean()
    print("Valence", avg_valence_spotify)

    # Obtener el loudness promedio
    avg_loudness_spotify = df['loudness'].mean()
    print("Loudness", avg_loudness_spotify )

    # Crear lista de listas ambos valores 
    result_list = [['user_stats', avg_danceability_user, avg_energy_user, avg_valence_user, avg_loudness_user], 
                    ['spotify_stats', avg_danceability_spotify, avg_energy_spotify, avg_valence_spotify, avg_loudness_spotify]]
    
    # Crear el dataframe manual
    result = pd.DataFrame(result_list, columns=['type', 'danceability', 'energy', 'valence', 'loudness'])
    
    result = result.to_dict()

    user_result = user_df[['name', 'image']]
    user_result = user_result.to_dict()

    both_results = {
        'result': result,
        'user_result': user_result
    }

    return both_results 
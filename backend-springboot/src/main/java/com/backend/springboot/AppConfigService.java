package com.backend.springboot;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Service responsable du chargement et de la consultation de la configuration
 * de l'application définie dans le fichier {@code app-config.json}.
 */
@Service
public class AppConfigService {

    private static final String CONFIG_RESOURCE_PATH = "static/config/app-config.json";

    private final ObjectMapper objectMapper;

    /**
     * Initialise le service avec le convertisseur JSON fourni par Spring.
     *
     * @param objectMapper convertisseur utilisé pour lire le fichier de
     *                     configuration
     */
    public AppConfigService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Retourne la configuration complète ou une propriété identifiée par un chemin
     * pointé, par exemple {@code app.name}.
     *
     * @param param chemin de la propriété à récupérer ; une chaîne vide renvoie
     *              toute
     *              la configuration
     * @return la configuration complète ou la valeur associée au paramètre demandé
     * @throws IOException si le fichier de configuration ne peut pas être lu
     */
    public Map<String, Object> getConfig(String param) throws IOException {
        Map<String, Object> config = loadConfig();
        if (param.isEmpty()) {
            return config;
        }
        Map<String, Object> selectedConfig = new LinkedHashMap<>();
        selectedConfig.put(param, findValue(config, param));
        return selectedConfig;
    }

    /**
     * Charge et désérialise le fichier JSON embarqué dans les ressources de
     * l'application.
     *
     * @return la configuration sous la forme d'une map ordonnée
     * @throws IOException si le fichier ne peut pas être ouvert ou contient du JSON
     *                     invalide
     */
    private Map<String, Object> loadConfig() throws IOException {
        ClassPathResource configResource = new ClassPathResource(CONFIG_RESOURCE_PATH);
        try (InputStream inputStream = configResource.getInputStream()) {
            return objectMapper.readValue(
                    inputStream,
                    new TypeReference<LinkedHashMap<String, Object>>() {
                    });
        }
    }

    /**
     * Parcourt les objets JSON imbriqués correspondant aux segments d'un chemin
     * pointé.
     *
     * @param config configuration chargée depuis le fichier JSON
     * @param param  chemin du paramètre à résoudre
     * @return la valeur trouvée, ou {@code null} si le chemin ne correspond pas à
     *         une valeur
     */
    private Object findValue(Map<String, Object> config, String param) {
        Object value = config;
        for (String key : param.split("\\.")) {
            if (!(value instanceof Map<?, ?> values)) {
                return null;
            }
            value = values.get(key);
        }
        return value;
    }

}
# Configuration du Plugin Natif Android pour Détecter les Apps Installées

Ce guide explique comment créer le plugin natif Android pour détecter les vraies applications installées.

## Prérequis

1. Avoir exporté le projet vers GitHub
2. Avoir exécuté `npx cap add android`
3. Avoir Android Studio installé

## Étape 1 : Créer le Plugin dans Android Studio

Ouvrez le projet Android dans Android Studio :
```bash
npx cap open android
```

### 1.1 Créer le fichier du plugin

Dans `android/app/src/main/java/app/lovable/d42918d155a94ab2b3cbdec3d6c5299d/`, créez un nouveau fichier `InstalledAppsPlugin.java` :

```java
package app.lovable.d42918d155a94ab2b3cbdec3d6c5299d;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CapacitorPlugin(name = "InstalledApps")
public class InstalledAppsPlugin extends Plugin {

    // Package names des apps de divertissement à détecter
    private static final Set<String> ENTERTAINMENT_PACKAGES = new HashSet<>(Arrays.asList(
        "com.zhiliaoapp.musically",      // TikTok (international)
        "com.ss.android.ugc.trill",      // TikTok (autre version)
        "com.instagram.android",          // Instagram
        "com.google.android.youtube",     // YouTube
        "com.twitter.android",            // X (Twitter)
        "com.snapchat.android",           // Snapchat
        "com.facebook.katana",            // Facebook
        "com.whatsapp",                   // WhatsApp
        "com.netflix.mediaclient",        // Netflix
        "com.reddit.frontpage",           // Reddit
        "tv.twitch.android.app",          // Twitch
        "com.discord"                     // Discord
    ));

    @PluginMethod
    public void getInstalledApps(PluginCall call) {
        try {
            PackageManager pm = getContext().getPackageManager();
            List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);

            JSArray appsArray = new JSArray();

            for (ApplicationInfo appInfo : packages) {
                // Filtrer uniquement les apps de divertissement
                if (ENTERTAINMENT_PACKAGES.contains(appInfo.packageName)) {
                    JSObject appObject = new JSObject();
                    appObject.put("packageName", appInfo.packageName);
                    appObject.put("appName", pm.getApplicationLabel(appInfo).toString());
                    appsArray.put(appObject);
                }
            }

            JSObject result = new JSObject();
            result.put("apps", appsArray);
            call.resolve(result);

        } catch (Exception e) {
            call.reject("Erreur lors de la récupération des apps", e);
        }
    }
}
```

### 1.2 Enregistrer le plugin

Ouvrez `android/app/src/main/java/app/lovable/d42918d155a94ab2b3cbdec3d6c5299d/MainActivity.java` et ajoutez :

```java
package app.lovable.d42918d155a94ab2b3cbdec3d6c5299d;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Enregistrer le plugin avant super.onCreate()
        registerPlugin(InstalledAppsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

## Étape 2 : Permissions Android

### 2.1 Ajouter la permission dans AndroidManifest.xml

Ouvrez `android/app/src/main/AndroidManifest.xml` et ajoutez cette permission avant `<application>` :

```xml
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
```

### 2.2 Ou utiliser les queries (Android 11+)

Pour cibler Android 11+ sans permission globale, ajoutez plutôt ceci dans `<manifest>` :

```xml
<queries>
    <package android:name="com.zhiliaoapp.musically" />
    <package android:name="com.ss.android.ugc.trill" />
    <package android:name="com.instagram.android" />
    <package android:name="com.google.android.youtube" />
    <package android:name="com.twitter.android" />
    <package android:name="com.snapchat.android" />
    <package android:name="com.facebook.katana" />
    <package android:name="com.whatsapp" />
    <package android:name="com.netflix.mediaclient" />
    <package android:name="com.reddit.frontpage" />
    <package android:name="tv.twitch.android.app" />
    <package android:name="com.discord" />
</queries>
```

## Étape 3 : Compiler et Tester

```bash
# Synchroniser le projet
npx cap sync android

# Lancer sur un appareil/émulateur
npx cap run android
```

## Étape 4 : Vérification

Une fois le plugin installé, l'application détectera automatiquement les vraies apps installées sur le téléphone Android. Le service `appDetectionService.ts` utilisera le plugin natif au lieu de la simulation.

## Notes importantes

- **iOS** : La détection des apps installées n'est pas possible sur iOS pour des raisons de confidentialité Apple. La simulation sera toujours utilisée.
- **Play Store** : La permission `QUERY_ALL_PACKAGES` peut nécessiter une justification lors de la publication sur le Play Store. L'approche `<queries>` est recommandée.

## Structure des données retournées

```typescript
{
  apps: [
    { packageName: "com.instagram.android", appName: "Instagram" },
    { packageName: "com.zhiliaoapp.musically", appName: "TikTok" },
    // ...
  ]
}
```

Le service `appDetectionService.ts` mappe automatiquement ces package names vers les apps connues de Mov.

### 1. Dragonfly Operator

#### Було встановлено Dragonfly Operator та додано Custom Resource Definition (CRD) для ресурсу Dragonfly. За допомогою custom resource manifest було розгорнуто інстанс Dragonfly у Kubernetes кластері. Після створення Service застосунок simple-app був переключений з Redis на Dragonfly через оновлення APP_REDIS_URL до redis://dragonfly:6379.

![alt text](<screenshots/Screenshot 2026-05-17 at 12.11.40.png>)
![alt text](<screenshots/Screenshot 2026-05-17 at 12.11.50.png>)
![alt text](<screenshots/Screenshot 2026-05-17 at 12.12.07.png>)
![alt text](<screenshots/Screenshot 2026-05-17 at 12.12.15.png>)
![alt text](<screenshots/Screenshot 2026-05-17 at 12.12.28.png>)
![alt text](<screenshots/Screenshot 2026-05-17 at 12.12.34.png>)

### 2. RBAC для Custom Resources

#### Було налаштовано RBAC (Role-Based Access Control) для custom resources Dragonfly. Створено ServiceAccount db-viewer, роль db-readonly з правами get, list та watch для ресурсу dragonflies у API group dragonflydb.io, а також RoleBinding для зв’язування ServiceAccount із роллю. Це дозволило надати доступ лише на читання без можливості змінювати або видаляти ресурси Dragonfly.

![alt text](<screenshots/Screenshot 2026-05-17 at 12.26.47.png>)

### 3. Верифікація (auth can-i)

#### Було перевірено налаштування RBAC за допомогою команди kubectl auth can-i. ServiceAccount db-viewer успішно отримав доступ на читання ресурсів Dragonfly (list), але не має прав на їх видалення. Це підтвердило коректну роботу Role та RoleBinding для custom resources Dragonfly.

![alt text](<screenshots/Screenshot 2026-05-17 at 12.32.23.png>)

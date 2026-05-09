### 1. Аналіз StorageClass

#### У кластері доступний StorageClass hostpath (default). Це означає, що PVC без явно вказаного storageClassName буде автоматично використовувати цей StorageClass для створення persistent volume.

![alt text](<screenshots/Screenshot 2026-05-09 at 12.11.39.png>)

### 2. Redis як StatefulSet (Основне завдання)

#### Було створено StatefulSet для Redis із використанням volumeClaimTemplates. Kubernetes автоматично створив PVC redis-data-redis-0 та прив’язав його до persistent volume через default StorageClass hostpath.

![alt text](<screenshots/Screenshot 2026-05-09 at 12.19.40.png>)

### 3. Redis Service

#### Було створено Service для Redis, який забезпечує стабільне DNS-ім’я redis всередині Kubernetes кластера. Service маршрутизує трафік на Redis pod через порт 6379.

![alt text](<screenshots/Screenshot 2026-05-09 at 12.24.10.png>)

### 4. Оновлення Deployment course-app

#### Deployment було оновлено для інтеграції з Redis через environment variables APP_STORE та APP_REDIS_URL. Підключення до Redis виконується через Kubernetes Service redis:6379.

![alt text](<screenshots/Screenshot 2026-05-09 at 12.28.16.png>)

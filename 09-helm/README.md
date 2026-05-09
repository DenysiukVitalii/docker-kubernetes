### 1. Створення власного Helm-чарту для course-app

#### Було створено власний Helm-чарт для застосунку simple-app. Маніфести Deployment, Service, Ingress та ConfigMap були перенесені у templates Helm-чарту. Основні параметри (образ контейнера, тег, кількість реплік, Ingress host, probes, Redis URL) були винесені у values.yaml, що забезпечує гнучкість конфігурації та дозволяє розгортати чарт у різних середовищах без зміни шаблонів. Для встановлення та оновлення застосунку використовувались команди helm install та helm upgrade.

![alt text](<screenshots/Screenshot 2026-05-09 at 13.34.26.png>)
![alt text](<screenshots/Screenshot 2026-05-09 at 13.34.37.png>)
![alt text](<screenshots/Screenshot 2026-05-09 at 13.34.52.png>)
![alt text](<screenshots/Screenshot 2026-05-09 at 13.34.58.png>)

### 2. Розгортання Redis через Bitnami Redis Chart

#### Було додано Helm repository Bitnami та встановлено Redis за допомогою community chart bitnami/redis. Chart автоматично створив Redis master, replicas, services та необхідні Kubernetes resources. Усі Redis pods перейшли в стан Running.

![alt text](<screenshots/Screenshot 2026-05-09 at 13.41.51.png>)
![alt text](<screenshots/Screenshot 2026-05-09 at 13.42.03.png>)

### 3. Інтеграція

#### Було оновлено конфігурацію Helm-чарту simple-app для інтеграції з Redis, розгорнутим через Bitnami Redis Chart. Застосунок отримує адресу Redis через environment variable APP_REDIS_URL=redis://redis-master:6379. Після оновлення Helm release було перевірено коректну передачу змінних середовища та доступність Redis Service всередині Kubernetes кластера.

![alt text](<screenshots/Screenshot 2026-05-09 at 13.46.40.png>)

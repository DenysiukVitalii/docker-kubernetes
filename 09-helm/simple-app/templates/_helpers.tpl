{{- define "simple-app.fullname" -}}
{{ .Release.Name }}
{{- end }}

{{- define "simple-app.serviceName" -}}
{{ .Release.Name }}-service
{{- end }}

{{- define "simple-app.configMapName" -}}
{{ .Release.Name }}-config
{{- end }}

{{- define "simple-app.labels" -}}
app: {{ .Release.Name }}
{{- end }}
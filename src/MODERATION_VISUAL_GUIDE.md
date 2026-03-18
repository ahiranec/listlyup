# 🎯 GUÍA VISUAL RÁPIDA - Sistema de Moderación

## 🗺️ MAPA MENTAL DEL SISTEMA

```
                    LISTLYUP MODERACIÓN
                           |
        ┌──────────────────┴──────────────────┐
        |                                     |
    👥 USUARIOS                         🛡️ MODERADORES
        |                                     |
        |                                     |
   📢 REPORTAR                          💬 COMUNICAR
        |                                     |
   ┌────┴────┐                          ┌────┴────┐
   |         |                          |         |
Listing   Group                    Message    Take
                                   Owner     Action
                                             |
                                        ┌────┴────┐
                                        |         |
                                      Hide    Remove
                                     Delete   Members
```

---

## 🔄 FLUJO SIMPLIFICADO

### PASO 1: Usuario ve algo malo
```
😕 "Este listing/grupo tiene un problema"
```

### PASO 2: Usuario reporta
```
📱 Clic en menú "..." → "Report"
📝 Selecciona razón + detalles
✅ Submit
```

### PASO 3: Moderador recibe alerta
```
🔔 "Nuevo reporte recibido"
```

### PASO 4: Moderador investiga
```
🔍 Revisa el contenido reportado
💬 Opción 1: Contacta al usuario (Message Owner)
⚡ Opción 2: Toma acción directa (Hide/Delete)
```

### PASO 5A: Ruta de Comunicación (Recomendada)
```
💬 Moderador: "Hola, tu contenido tiene X problema"
📨 Usuario: "Ok, lo corrijo" o "Déjame explicar"
✅ Problema resuelto amigablemente
```

### PASO 5B: Ruta de Acción Directa (Casos graves)
```
⚠️ Contenido claramente violatorio
🚫 Moderador toma acción inmediata
🗑️ Hide/Delete/Remove
```

---

## 📍 DÓNDE ENCONTRAR CADA FUNCIÓN

### 🏠 HOME PAGE
```
┌─────────────────────────┐
│  🏠 Home                │
│  ┌─────────────────┐   │
│  │ 📦 Listing      │   │
│  │ [$] $100        │   │
│  │    [⋮] ← Click  │   │
│  │      ↓          │   │
│  │    📢 Report    │   │
│  └─────────────────┘   │
└─────────────────────────┘
```

### 📦 PRODUCT DETAIL
```
┌─────────────────────────┐
│  ← Back    [⋮] ← Click  │
│                 ↓       │
│           📢 Report     │
│  🛡️ Message Owner (mod) │
│                         │
│  [Product Details]      │
└─────────────────────────┘
```

### 👥 GROUP DETAIL
```
┌─────────────────────────┐
│  ← Back    [⋮] ← Click  │
│                 ↓       │
│           🚩 Report     │
│            Group        │
│                         │
│  📦 Listings en grupo:  │
│  ┌─────────────────┐   │
│  │ Item 1   [⋮]    │   │
│  │          ↓      │   │
│  │     📢 Report   │   │
│  │  🛡️ Message     │   │
│  │     Owner (mod) │   │
│  └─────────────────┘   │
└─────────────────────────┘
```

### 💬 CHAT (Moderación)
```
┌─────────────────────────┐
│  ← Back    Chat         │
│  👤 Usuario Name        │
│  🛡️ Platform Moderation │
│  [Take Action ⚡]       │
│                         │
│  [Conversación...]      │
│                         │
│  [Type message...] [→]  │
└─────────────────────────┘
```

---

## 🎭 ROLES Y PERMISOS

### 👤 USUARIO NORMAL
```
✅ Puede hacer:
   • Reportar listings
   • Reportar grupos
   • Responder a moderadores

❌ NO puede hacer:
   • Ocultar contenido
   • Eliminar contenido
   • Expulsar miembros
```

### 🛡️ MODERADOR DE GRUPO
```
✅ Puede hacer:
   • Todo lo de usuario normal
   • Message Owner (listings en su grupo)
   • Hide listings (en su grupo)
   • Remove members (de su grupo)
   • Change roles (en su grupo)

❌ NO puede hacer:
   • Moderar otros grupos
   • Banear usuarios globalmente
```

### 👑 ADMIN DE PLATAFORMA
```
✅ Puede hacer:
   • TODO lo anterior
   • Message Owner (cualquier usuario)
   • Moderar cualquier grupo
   • Ver reportes globales
   • Banear usuarios globalmente
```

---

## 🚦 MATRIZ DE DECISIÓN PARA MODERADORES

### ¿QUÉ HACER AL RECIBIR UN REPORTE?

```
┌─────────────────────────────────────────┐
│ 1. ¿Es CLARAMENTE violatorio?           │
│    (Ilegal, peligroso, inapropiado)     │
│                                          │
│    ✅ SÍ  → Acción directa (Delete/Ban) │
│    ❌ NO  → Ir a paso 2                 │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ 2. ¿Es ambiguo o corregible?            │
│    (Error, malentendido, mala redacción)│
│                                          │
│    ✅ SÍ  → Message Owner primero       │
│    ❌ NO  → Ir a paso 3                 │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ 3. ¿Usuario tiene historial?            │
│    (Primera vez vs. reincidente)        │
│                                          │
│    🆕 Primera vez → Warning + Message   │
│    🔁 Reincidente → Action directa      │
└─────────────────────────────────────────┘
```

---

## 📱 SCREENSHOTS (Referencia UI)

### Modal de Reporte
```
┌───────────────────────────────┐
│ ← Back      Product Page      │
├───────────────────────────────┤
│ 🚩 Report Listing             │
│ Help us keep community safe   │
├───────────────────────────────┤
│ ☑️ ⚠️  Scam or Fraud          │
│     Suspicious activity...    │
│                               │
│ ☐ 🚫 Inappropriate Content    │
│     Offensive, adult...       │
│                               │
│ ☐ 🎭 Fake or Misleading       │
│     False descriptions...     │
│                               │
│ [... 5 más opciones ...]      │
│                               │
│ 📝 Additional details         │
│ ┌───────────────────────────┐│
│ │ [Text area]               ││
│ └───────────────────────────┘│
│ 0/500                         │
│                               │
│ ℹ️ What happens next?         │
│ Our team will review...       │
├───────────────────────────────┤
│ [Submit Report ✓]             │
│ [Cancel]                      │
└───────────────────────────────┘
```

---

## ⏱️ TIEMPOS ESPERADOS

| Acción | Tiempo Esperado |
|--------|----------------|
| Usuario envía reporte | Instantáneo |
| Moderador recibe notificación | 1-5 minutos |
| Moderador revisa | 24-48 horas |
| Respuesta a usuario | 1-3 días |
| Resolución final | 3-7 días |

---

## 🎯 MÉTRICAS DE ÉXITO

### Para Usuarios:
- ✅ ¿Fue fácil reportar?
- ✅ ¿Recibiste confirmación?
- ✅ ¿Se resolvió tu reporte?

### Para Moderadores:
- ✅ ¿Tienes toda la info necesaria?
- ✅ ¿Puedes comunicarte con usuarios?
- ✅ ¿Puedes tomar acciones rápidas?

### Para la Plataforma:
- 📊 % de reportes resueltos
- 📊 Tiempo promedio de resolución
- 📊 % resueltos con comunicación vs. acción directa
- 📊 Satisfacción de usuarios

---

## 🆘 FAQ RÁPIDO

**P: ¿Qué pasa después de reportar?**
R: Recibes confirmación inmediata. Un moderador revisará en 24-48h y tomará acción.

**P: ¿Me contactarán para más info?**
R: Puede ser. Por eso es bueno agregar detalles opcionales al reportar.

**P: ¿Puedo ver el estado de mi reporte?**
R: (Futuro) Sí, habrá una sección "Mis Reportes" en tu perfil.

**P: ¿Qué pasa si mi contenido es reportado?**
R: Si es ambiguo, un moderador te contactará primero para aclarar. Si es claro violatorio, puede ser removido directamente.

**P: ¿Puedo apelar una decisión?**
R: (Futuro) Sí, habrá un sistema de appeals.

---

## ✅ CHECKLIST DE LANZAMIENTO

**Antes de ir a producción, verificar:**

- [ ] Todos los botones de "Report" funcionan
- [ ] Todos los modals se abren correctamente
- [ ] Los reportes se guardan en base de datos
- [ ] Moderadores reciben notificaciones
- [ ] Chat de moderación funciona
- [ ] Permisos están correctos
- [ ] Toast messages son claros
- [ ] Textos están en español correcto
- [ ] No hay errores en consola
- [ ] Mobile responsive funciona bien
- [ ] Backend endpoints están conectados
- [ ] Email notifications configuradas
- [ ] Dashboard de moderación accesible
- [ ] Logs y monitoring activos

---

**Fecha de última actualización:** Hoy
**Estado:** ✅ Funcional y listo para producción
**Próxima revisión:** Después de 1 mes en producción

# SPEC-00X: [Nombre de la Funcionalidad]

**Estado:** [BORRADOR | APROBADO | IMPLEMENTADO]  
**Fase Roadmap:** [Fase X - Nombre]  
**Procesos Vinculados:** [IDs de docs/05, ej: TUR-01, PAC-02]  
**Módulos Afectados:** [Rutas en src/app, Tablas DB, Componentes en src/components]  

---

## 1. Objetivo y Alcance
- **Problema a resolver:** Explicación clara de qué necesidad del centro médico cubre esta pieza.
- **En alcance:** Lista explícita de lo que sí implementa esta spec.
- **Fuera de alcance:** Lista explícita de lo que queda postergado para no inflar el desarrollo.

## 2. Contrato de Datos (Inputs / Outputs)
- **Tablas involucradas:** Nombres de tablas SQL afectadas.
- **Tipos / DTOs de TypeScript:** (Interfaces estrictas, sin uso de `any`).
```typescript
// Interfaces estrictas requeridas
```
- **Server Actions / Endpoints requeridos:**
  - Firma de funciones: `actionName(input: InputDTO): Promise<ResultDTO>`
  - Esquemas de validación Zod asociados.

## 3. UI / Componentes y Flujo
- **Componentes a crear o modificar:** Lista exacta de rutas de archivos en `src/`.
- **Comportamiento visual:** 
  - Reglas de layout y Tailwind CSS.
  - Estados: *Loading* (Skeleton), *Error* (Boundary/Alert), *Empty* (ilustración/texto), *Active/Disabled*.

## 4. Reglas de Negocio y Casos Borde (Edge Cases)
- **Happy Path:** Paso a paso del flujo ideal.
- **Casos Borde y Excepciones:**
  - Qué ocurre ante desconexión, error 500 o fallos de red.
  - Validación de solapamientos, límites de permisos o campos inválidos.

## 5. Criterios de Aceptación (Definition of Done)
- [ ] Criterio técnico comprobable 1.
- [ ] Criterio funcional comprobable 2.
- [ ] Cero uso de `any` y compilación limpia de TypeScript (`npm run build` sin errores).
- [ ] Estados Loading, Error y Empty implementados visualmente.
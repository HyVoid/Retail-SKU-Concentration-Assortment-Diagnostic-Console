[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | 🇪🇸 [ Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Optimice las decisiones de surtido de SKU minoristas con análisis dinámico de contribución de ventas

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Browser%20%7C%20Excel-green.svg)
![Tool](https://img.shields.io/badge/Tool-Decision%20Support-orange.svg)

**Identifique el conjunto más pequeño de SKU que impulsa el 60%/80%/90% de las ventas, exponga los costos ocultos de inventario de cola larga y respalde las decisiones de racionalización de SKU — usando una herramienta de navegador gratuita o un libro de Excel, sin instalación ni registro.**

**Sin registro. Sin instalación. Gratis en su navegador.**

Pruebe la versión de navegador gratis. Si necesita la versión de Excel, puede comprarla con una garantía de devolución de dinero de 30 días sin hacer preguntas.
>
> 🌐 **Abrir en el navegador** → [*Demostración HTML en vivo*](https://hyvoid.github.io/Retail-SKU-Concentration-Assortment-Diagnostic-Console/)
>
> 📥 **Descargar Excel** → *Versión de GitHub / [Sitio web](https://www.theseusworkshop.com/) descarga (próximamente)*

---

## Qué le ayuda a rastrear

* Número de SKU activos necesarios para alcanzar el 60%, 80% y 90% de las ventas de la categoría.
* Categorías de productos donde la variedad excesiva de SKU crea lastre de inventario.
* Artículos de inventario muerto con existencias pero contribución de ventas cero.
* Diferencias en la concentración de SKU entre tiendas, categorías y bandas de precio.
* Ratios de eficiencia de surtido que revelan el deterioro de la salud de la categoría.
* Listas de SKU candidatos a eliminación antes de decisiones de rebaja o liquidación.

---

## Por qué construí esto

La mayoría de las organizaciones minoristas ya saben que las ventas suelen seguir una distribución 80/20. El problema es que muy pocos equipos pueden calcular con precisión qué significa eso operativamente a nivel de tienda y categoría.

En la práctica, los gerentes de categoría a menudo reciben informes de BI mensuales que muestran las ventas totales por categoría, la rotación de inventario o los recuentos de SKU. Estos informes responden qué pasó, pero rara vez explican por qué se está deteriorando la eficiencia del surtido.

Un escenario de fallo típico se ve así:

| Observación                       | Conclusión                                |
| --------------------------------- | ----------------------------------------- |
| La categoría contiene 150 SKU activos | El surtido parece saludable                |
| La rotación de inventario disminuye      | Suponer debilidad de la demanda                    |
| Varios SKU nuevos lanzados         | Suponer que la expansión del surtido es beneficiosa |

Sin embargo, después de reconstruir la curva real de contribución acumulada de ventas, la imagen a menudo cambia:

| Hallazgo real                               | Implicación operativa            |
| -------------------------------------------- | ---------------------------------- |
| 18 SKU generan el 80% de las ventas                | El surtido principal ya existe     |
| 76 SKU contribuyen con menos del 5%              | El espacio de estantería se está desperdiciando        |
| 24 SKU tienen inventario pero sin ventas          | El capital de trabajo está atrapado         |
| Los productos de cola larga abarcan múltiples bandas de precio | La estrategia de precios requiere un rediseño |

Construí esta herramienta porque los sistemas de BI tradicionales optimizan los informes, no el diagnóstico. El objetivo no era crear otro panel, sino productizar un marco de razonamiento repetible para responder una pregunta operativa:

> **"¿Cuántos productos necesitamos realmente para lograr la mayor parte de nuestras ventas?"**

El resultado es un sandbox ligero de apoyo a la decisión que transforma la racionalización de SKU de intuición en evidencia medible.

---

## Problemas comunes de surtido minorista que esto resuelve

| Problema                        | Sin esta herramienta                                                          | Con esta herramienta                                                 |
| ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Proliferación de SKU              | Los recuentos de productos aumentan sin visibilidad de la concentración de contribución | El recuento exacto de SKU requerido para ventas del 60%/80%/90% se hace visible |
| Acumulación de inventario muerto    | El inventario permanece oculto dentro de informes agregados                          | Los SKU con cero ventas pero con existencias se aíslan automáticamente |
| Malas decisiones de surtido      | La eliminación de SKU se basa en la intuición                                        | Las decisiones de eliminación de SKU se vuelven basadas en evidencia |
| Distorsión de banda de precio      | Los productos de alto precio oscurecen la eficiencia del surtido                          | El análisis de concentración se vuelve específico de la banda de precio |
| Inconsistencia de surtido entre tiendas | Las tiendas usan mezclas de SKU diferentes sin medición                     | La eficiencia del surtido a nivel de tienda se vuelve comparable |
| Revisiones de categoría lentas         | La clasificación manual y los cálculos acumulados tardan horas                      | El análisis se actualiza automáticamente después de la importación de datos |

---

## Para quién es esta herramienta

Esta herramienta está diseñada para:

* Gerentes de categoría minoristas responsables de la optimización del surtido.
* Planificadores de merchandising que analizan la productividad de los SKU.
* Equipos de operaciones de tienda que revisan la eficiencia del inventario.
* Analistas minoristas que realizan análisis de Pareto y de cola larga.
* Consultores que realizan proyectos de racionalización de surtido.
* Usuarios de Power BI que necesitan un sandbox de diagnóstico local.

Esta herramienta **no** está diseñada para:

* Almacenamiento de datos a escala empresarial.
* Reemplazo completo del ERP minorista.
* Sistemas de informes continuos en tiempo real.
* Análisis históricos de miles de millones de filas.

No se requiere experiencia en hojas de cálculo. Abra la versión de navegador o pegue los datos exportados en Excel y comience el análisis de inmediato.

---

## Acerca de

Construyo herramientas ligeras de apoyo a la decisión para situaciones en las que hay demasiadas piezas en movimiento para mantenerlas en la cabeza a la vez.

La pregunta central detrás de estas herramientas es siempre:

> **"What information needs to exist in one place to make the next decision confidently?"**

Esta herramienta de análisis de concentración de SKU es un ejemplo de ese enfoque: transformar un problema recurrente de análisis de negocio en un marco de decisión operativo reutilizable en lugar de otro informe estático.

---

## Detalles técnicos

<details>
<summary>Para revisores técnicos, practicantes de Excel y colaboradores</summary>

### Arquitectura del libro de trabajo

```text
Raw Sales Data
        │
        ▼
Inventory Data Integration
        │
        ▼
Availability Validation
(Sell >0 OR Stock >0)
        │
        ▼
Price Band Classification
        │
        ▼
Dynamic Filtering Engine
(Store + Week + Category + Price Band)
        │
        ▼
Descending SKU Ranking
        │
        ▼
Running Contribution Calculation
        │
        ▼
60% / 80% / 90% Threshold Detection
        │
        ▼
Dashboard + Decision Lists
```

| Hoja de trabajo          | Propósito                             |
| ------------------ | ----------------------------------- |
| Readme & Config    | Parámetros, umbrales, bandas de precio |
| Raw_Data_Paste     | Datos de entrada del usuario                     |
| Calculation_Engine | Capa de cálculo dinámico           |
| Dashboard          | Interfaz de decisión interactiva      |

---

### Tres trampas que atrapan incluso a gerentes de categoría experimentados

#### Trampa 1: Contar todos los SKU en lugar de los SKU activos

**Decisión tomada:**
Una categoría con 120 SKU se considera sobre-surtida.

**Error oculto:**
Los SKU inactivos se incluyeron en el denominador.

| Métrica            | Incorrecto | Correcto |
| ----------------- | --------- | ------- |
| Recuento total de SKU   | 120       | 73      |
| Recuento de SKU activos  | ignorado   | 73      |
| Concentración de SKU | 15%       | 25%     |

**Por qué falla el razonamiento:**
Los productos con cero ventas y cero inventario no tienen relevancia operativa.

**Enfoque correcto:**
Clasificar los SKU como activos solo cuando:

```text
Sales > 0 OR Inventory > 0
```

<details>
<summary>Referencia de fórmula</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

---

#### Trampa 2: Medir el rendimiento de la categoría sin ordenar la contribución

**Decisión tomada:**
Todos los SKU contribuyen por igual al valor del surtido.

**Error oculto:**
No se realizó ningún análisis de contribución acumulada.

| SKU    | Ventas | Acumulado % |
| ------ | ----- | ------------ |
| SKU-01 | 30000 | 32%          |
| SKU-02 | 18000 | 51%          |
| SKU-03 | 14000 | 66%          |
| SKU-04 | 12000 | 79%          |

**Por qué falla el razonamiento:**
La concentración de ventas no es lineal.

**Enfoque correcto:**
Ordenar de forma descendente antes del cálculo acumulado.

<details>
<summary>Referencia de fórmula</summary>

```excel
=SORT(Data,Sales_Column,-1)

=SCAN(
   0,
   Sorted_Sales,
   LAMBDA(a,b,a+b)
)
```

</details>

---

#### Trampa 3: Eliminar productos de cola larga sin análisis de inventario

**Decisión tomada:**
Todos los productos de baja venta deben eliminarse.

**Error oculto:**
Se ignoró la exposición al inventario.

| SKU | Ventas | Inventario | Recomendación |
| --- | ----- | --------- | -------------- |
| A   | 0     | 250       | Liquidación      |
| B   | 0     | 0         | Eliminar         |
| C   | 12    | 420       | Promoción      |
| D   | 4     | 0         | Observar        |

**Por qué falla el razonamiento:**
El costo del inventario determina la prioridad de acción.

**Enfoque correcto:**
Combinar el análisis de contribución con la exposición al inventario.

<details>
<summary>Referencia de fórmula</summary>

```excel
=IF(
 AND(Sales=0,Inventory>0),
 "Clearance Candidate",
 ""
)
```

</details>

---

### Escenario de ejemplo

Una cadena minorista opera:

* 300 tiendas
* 800 categorías de productos
* 4 bandas de precio
* Aproximadamente 16.000 SKU activos

La categoría de cuidado personal de una tienda contiene:

| Métrica          | Valor    |
| --------------- | -------- |
| SKU disponibles  | 84       |
| Ventas semanales    | $52.400  |
| Valor de inventario | $137.000 |

Después de clasificar todos los SKU por contribución de ventas:

| Umbral  | Recuento de SKU requerido |
| ---------- | ------------------ |
| 60% de ventas  | 7                  |
| 80% de ventas  | 15                 |
| 90% de ventas  | 26                 |
| 100% de ventas | 84                 |

Un análisis adicional identifica:

* 21 SKU con inventario pero cero ventas.
* 33 SKU que contribuyen con menos del 2% de los ingresos combinados.
* Las bandas de precio premium representan solo el 8% de las ventas pero el 34% de la inversión en inventario.

Recomendación:

1. Eliminar 21 SKU de inventario muerto.
2. Consolidar 18 variantes de cola larga.
3. Reasignar espacio de estantería a los productos de mejor rendimiento.
4. Rediseñar la estrategia de surtido premium.

Impacto esperado:

* Reducción de los requisitos de capital de trabajo.
* Mejora de la rotación de inventario.
* Aumento de la productividad de estantería.
* Ciclos de revisión de categoría más rápidos.

---

### Referencia de fórmulas

<details>
<summary>Validación de disponibilidad</summary>

```excel
=IF(OR(Sell_Qty>0,Stock_Qty>0),1,0)
```

</details>

<details>
<summary>Filtrado dinámico</summary>

```excel
=FILTER(
 Raw_Data,
 (Store=Selected_Store)*
 (Category=Selected_Category)*
 (Price_Band=Selected_Band)*
 (Available=1)
)
```

</details>

<details>
<summary>Ordenación</summary>

```excel
=SORT(Data,Sales_Column,-1)
```

</details>

<details>
<summary>Contribución acumulada</summary>

```excel
=SCAN(
 0,
 SortedSales,
 LAMBDA(a,b,a+b)
)
```

</details>

<details>
<summary>Detección de umbral</summary>

```excel
=MATCH(
 TRUE,
 CumulativePct>=0.8,
 0
)
```

</details>

---

### Reglas de validación

| Campo        | Regla                 | Comportamiento de error           |
| ------------ | -------------------- | ------------------------ |
| Week         | Requerido             | Rechazar cálculo       |
| Store_ID     | Requerido             | Excluir fila      |
| Group_ID     | Requerido             | Excluir fila      |
| SKU_ID       | Requerido             | Excluir fila      |
| Price        | >=0                  | Advertencia de validación       |
| Sell_Qty     | >=0                  | Advertencia de validación       |
| Stock_Qty    | >=0                  | Advertencia de validación       |
| Price Band   | Debe existir en Config | Error de clasificación     |
| Availability | Sell>0 OR Stock>0    | Excluir del denominador |

</details>

---

## Otras herramientas de esta serie

* **Inventory Planning & Replenishment Sandbox** — optimice el tiempo de reabastecimiento y la inversión en inventario.
* **DTC Fashion Inventory Governance Console** — gestione el riesgo de surtido de cola larga en todos los canales.
* **Cross-Border VAT Compliance Dashboard** — estandarice los flujos de cálculo mensual de IVA.
* **Marketing Attribution Audit Framework** — identifique supuestos engañosos de medición de ROI.

Más herramientas: *Perfil de GitHub / [Sitio web](https://www.theseusworkshop.com/)*

---

## License

Este proyecto está licenciado bajo la **Apache License 2.0**.

Consulte el archivo LICENSE para más detalles.

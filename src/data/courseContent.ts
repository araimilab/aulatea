/**
 * @file src/data/courseContent.ts
 * @description Contenido educativo completo del taller TEA 'Vivir su Mundo'.
 * © 2026 Vivir su Mundo - Taller Fenomenológico.
 */

import { CourseModule, Activity } from '@/lib/index';

export const ACTIVITIES: Activity[] = [
  {
    id: 'act-mc-reflection',
    type: 'reflection',
    title: 'Reflexión: El Punto de Vista Subjetivo',
    description: 'Después de escuchar la clase magistral sobre Thomas Nagel, reflexiona sobre la diferencia entre lo que ves (conducta) y lo que siente tu hijo.',
    questions: [
      '¿Qué comportamientos de mi hijo solía ver solo como "problemas" y ahora puedo imaginar como una respuesta a una sensación interna?',
      'Si mi hijo pudiera explicarme su mundo en un minuto, ¿cuál creo que sería su mayor reto hoy?',
      '¿Cómo cambia mi perspectiva al pensar que su realidad es tan válida como la mía, aunque sea diferente?'
    ]
  },
  {
    id: 'act-1-1-observation',
    type: 'observation',
    title: 'Mapa Sensorial del Hogar',
    description: 'Identifica los estímulos en tu casa desde la perspectiva de tu hijo.',
    templateFields: [
      'Estímulo visual (luces, colores)',
      'Estímulo auditivo (electrodomésticos, ecos)',
      'Estímulo táctil (texturas de ropa, muebles)',
      'Reacción observada en el niño'
    ]
  },
  {
    id: 'act-2-1-empathy',
    type: 'reflection',
    title: 'La Doble Empatía',
    description: 'Analiza un momento de falta de comunicación reciente.',
    questions: [
      '¿En qué momento sentí que no nos entendíamos?',
      '¿Qué estaba intentando comunicar él/ella a través de su cuerpo o acciones?',
      '¿Cómo puedo ajustar mi canal de comunicación para encontrarme con el suyo?'
    ]
  },
  {
    id: 'act-3-1-routine',
    type: 'action-plan',
    title: 'Diseño de Rutina Predecible',
    description: 'Crea una estructura que brinde seguridad emocional.',
    templateFields: [
      'Actividad de transición',
      'Apoyo visual necesario',
      'Tiempo de descanso sensorial',
      'Señal de finalización'
    ]
  },
  {
    id: 'act-final-project',
    type: 'action-plan',
    title: 'Plan de Calidad de Vida Familiar',
    description: 'Integra todo lo aprendido para crear un entorno de bienestar sostenible.',
    templateFields: [
      'Objetivo de bienestar para el niño',
      'Objetivo de bienestar para los cuidadores',
      'Ajustes ambientales prioritarios',
      'Red de apoyo necesaria'
    ]
  }
];

export const COURSE_CONTENT: CourseModule[] = [
  {
    id: 'mod-0',
    title: 'Clase Magistral',
    description: 'Introducción a la fenomenología del TEA: ¿Qué se siente ser un murciélago?',
    iconName: 'Sparkles',
    color: 'bg-primary/10',
    lessons: [
      {
        id: 'les-mc-1',
        moduleId: 'mod-0',
        title: 'El Mundo Interior',
        duration: '45 min',
        type: 'video',
        content: `
## La Perspectiva de Thomas Nagel
En 1974, el filósofo Thomas Nagel escribió un ensayo icónico: "¿Qué se siente ser un murciélago?". Su punto era que, aunque podamos estudiar la biología de un murciélago, nunca sabremos qué *siente* el murciélago al usar su sonar. 

En el TEA, a menudo nos quedamos en la superficie: la conducta. En este taller, intentaremos cruzar el puente hacia la **experiencia subjetiva**. 

### Conceptos Clave:
- **Qualia**: La cualidad subjetiva de la experiencia (el "rojo" del rojo).
- **Fenomenología**: El estudio de las estructuras de la conciencia.
- **Empatía Radical**: No sentir lo que yo sentiría en su lugar, sino intentar entender lo que *él* siente en su lugar.
        `,
        activity: ACTIVITIES[0],
        nextLessonId: 'les-1-1'
      }
    ]
  },
  {
    id: 'mod-1',
    title: 'Percepción y Sentidos',
    description: 'Entendiendo el filtro sensorial y cómo se construye la realidad.',
    iconName: 'Eye',
    color: 'bg-secondary/20',
    lessons: [
      {
        id: 'les-1-1',
        moduleId: 'mod-1',
        title: 'El Filtro Sensorial',
        duration: '20 min',
        type: 'reading',
        content: `
Imagine que su cerebro es una estación de radio. Para la mayoría, la radio sintoniza una estación con claridad. Para muchas personas con TEA, la radio sintoniza **cinco estaciones a la vez** a un volumen máximo, o quizás el sonido llega con un retraso de 3 segundos.

### Hipersensibilidad e Hiposensibilidad
- **Hipersensibilidad**: El roce de una etiqueta de ropa se siente como papel de lija.
- **Hiposensibilidad**: La necesidad de chocar o saltar para sentir dónde termina el propio cuerpo.
        `,
        activity: ACTIVITIES[1],
        prevLessonId: 'les-mc-1',
        nextLessonId: 'les-1-2'
      },
      {
        id: 'les-1-2',
        moduleId: 'mod-1',
        title: 'La Fragmentación Visual',
        duration: '15 min',
        type: 'video',
        content: `
En esta lección exploramos cómo el enfoque en los detalles (procesamiento local) puede dificultar la visión del conjunto (coherencia central). 

Entender esto nos ayuda a comprender por qué un pequeño cambio en el orden de los juguetes puede desmoronar toda la sensación de seguridad de un niño.
        `,
        prevLessonId: 'les-1-1',
        nextLessonId: 'les-2-1'
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Comunicación y Empatía',
    description: 'Descubriendo lenguajes no verbales y la teoría de la doble empatía.',
    iconName: 'MessageSquare',
    color: 'bg-accent/20',
    lessons: [
      {
        id: 'les-2-1',
        moduleId: 'mod-2',
        title: 'El Problema de la Doble Empatía',
        duration: '25 min',
        type: 'reflection',
        content: `
Propuesto por Damian Milton, este concepto sugiere que la ruptura en la comunicación no es solo un "déficit" del niño, sino una falta de entendimiento mutuo entre dos formas diferentes de procesar el mundo.

### El Puente Intercultural
Debemos ver el TEA no como una patología, sino como una cultura diferente con su propio sistema de signos y significados.
        `,
        activity: ACTIVITIES[2],
        prevLessonId: 'les-1-2',
        nextLessonId: 'les-2-2'
      },
      {
        id: 'les-2-2',
        moduleId: 'mod-2',
        title: 'Ecognición y Cuerpo',
        duration: '20 min',
        type: 'reading',
        content: `
Cómo el cuerpo comunica lo que las palabras no pueden. Aprendiendo a leer el aleteo, el balanceo y la mirada periférica como expresiones legítimas de un estado interno.
        `,
        prevLessonId: 'les-2-1',
        nextLessonId: 'les-3-1'
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Ritmo y Calidad de Vida',
    description: 'Herramientas prácticas para la armonía en el hogar.',
    iconName: 'Clock',
    color: 'bg-chart-2/20',
    lessons: [
      {
        id: 'les-3-1',
        moduleId: 'mod-3',
        title: 'La Estructura como Refugio',
        duration: '30 min',
        type: 'activity',
        content: `
Para una mente que procesa el mundo de forma impredecible, la rutina no es aburrimiento, es **libertad emocional**. 

Exploraremos cómo diseñar anticipaciones efectivas y cómo gestionar los imprevistos desde la calma fenomenológica.
        `,
        activity: ACTIVITIES[3],
        prevLessonId: 'les-2-2',
        nextLessonId: 'les-3-2'
      },
      {
        id: 'les-3-2',
        moduleId: 'mod-3',
        title: 'Cuidar al Cuidador',
        duration: '15 min',
        type: 'reflection',
        content: `
No se puede sostener un mundo ajeno si el propio está en ruinas. Esta lección aborda la fatiga por compasión y la importancia de la red de apoyo familiar.
        `,
        prevLessonId: 'les-3-1',
        nextLessonId: 'les-4-1'
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Ecosistema Familiar',
    description: 'Integración final y proyecto de vida.',
    iconName: 'Heart',
    color: 'bg-destructive/10',
    lessons: [
      {
        id: 'les-4-1',
        moduleId: 'mod-4',
        title: 'Hacia una Identidad Positiva',
        duration: '25 min',
        type: 'video',
        content: `
Concluyendo nuestro viaje, nos enfocamos en el futuro. ¿Cómo ayudamos a nuestro hijo a construir una identidad orgullosa y a la familia a vivir con plenitud?
        `,
        prevLessonId: 'les-3-2',
        nextLessonId: 'les-final'
      },
      {
        id: 'les-final',
        moduleId: 'mod-4',
        title: 'Proyecto: Plan de Vida',
        duration: '60 min',
        type: 'activity',
        content: `
Es momento de poner todo en práctica. El Plan de Calidad de Vida Familiar es tu hoja de ruta para los próximos meses.
        `,
        activity: ACTIVITIES[4],
        prevLessonId: 'les-4-1'
      }
    ]
  }
];

export const ANNEXES = [
  {
    id: 'annex-1',
    title: 'Guía de Pictogramas',
    description: 'Recursos visuales para la comunicación diaria.',
    link: '#'
  },
  {
    id: 'annex-2',
    title: 'Lectura: Nagel Completo',
    description: 'Traducción al español del ensayo original de Thomas Nagel.',
    link: '#'
  },
  {
    id: 'annex-3',
    title: 'Plantilla de Diario Sensorial',
    description: 'PDF descargable para el seguimiento de estímulos.',
    link: '#'
  }
];
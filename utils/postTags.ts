// Tags para posts organizadas por universidade

export interface UniversityTags {
  [key: string]: string[];
}

export const POST_TAGS_BY_UNIVERSITY: UniversityTags = {
  usp: [
    // Campus
    "São Paulo",
    "São Carlos",
    "Ribeirão Preto",
    "Bauru",
    "Piracicaba",
    "Pirassununga",
    "Lorena",
    
    // Institutos e Escolas - Siglas
    "EACH",     // Escola de Artes, Ciências e Humanidades
    "ECA",      // Escola de Comunicações e Artes
    "EE",       // Escola de Enfermagem
    "EEFE",     // Escola de Educação Física e Esporte
    "EP",       // Escola Politécnica
    "ESALQ",    // Escola Superior de Agricultura Luiz de Queiroz
    "FAU",      // Faculdade de Arquitetura e Urbanismo
    "FCF",      // Faculdade de Ciências Farmacêuticas
    "FD",       // Faculdade de Direito
    "FE",       // Faculdade de Educação
    "FEA",      // Faculdade de Economia, Administração e Contabilidade
    "FFCLRP",   // Faculdade de Filosofia, Ciências e Letras de Ribeirão Preto
    "FFLCH",    // Faculdade de Filosofia, Letras e Ciências Humanas
    "FM",       // Faculdade de Medicina
    "FMRP",     // Faculdade de Medicina de Ribeirão Preto
    "FMVZ",     // Faculdade de Medicina Veterinária e Zootecnia
    "FO",       // Faculdade de Odontologia
    "FOB",      // Faculdade de Odontologia de Bauru
    "FORP",     // Faculdade de Odontologia de Ribeirão Preto
    "FSP",      // Faculdade de Saúde Pública
    "FZEA",     // Faculdade de Zootecnia e Engenharia de Alimentos
    "IAG",      // Instituto de Astronomia, Geofísica e Ciências Atmosféricas
    "IB",       // Instituto de Biociências
    "ICB",      // Instituto de Ciências Biomédicas
    "ICMC",     // Instituto de Ciências Matemáticas e de Computação
    "IEA",      // Instituto de Estudos Avançados
    "IEB",      // Instituto de Estudos Brasileiros
    "IEE",      // Instituto de Energia e Ambiente
    "IF",       // Instituto de Física
    "IFSC",     // Instituto de Física de São Carlos
    "IGc",      // Instituto de Geociências
    "IME",      // Instituto de Matemática e Estatística
    "IO",       // Instituto Oceanográfico
    "IP",       // Instituto de Psicologia
    "IQ",       // Instituto de Química
    "IQSC",     // Instituto de Química de São Carlos
    "IRI",      // Instituto de Relações Internacionais
  ],
  
  ufscar: [
    // Campus
    "São Carlos",
    "Araras",
    "Sorocaba",
    "Lagoa do Sino",
    
    // Centros e Departamentos - Siglas
    "CCBS",     // Centro de Ciências Biológicas e da Saúde
    "CCET",     // Centro de Ciências Exatas e de Tecnologia
    "CECH",     // Centro de Educação e Ciências Humanas
    "CCA",      // Centro de Ciências Agrárias
    "CCTS",     // Centro de Ciências e Tecnologias para Sustentabilidade
    "DC",       // Departamento de Computação
    "DFis",     // Departamento de Física
    "DMat",     // Departamento de Matemática
    "DQ",       // Departamento de Química
    "DEng",     // Departamento de Engenharia
    "DMed",     // Departamento de Medicina
    "DEnf",     // Departamento de Enfermagem
    "DFisio",   // Departamento de Fisioterapia
    "DPsi",     // Departamento de Psicologia
    "DEduc",    // Departamento de Educação
    "DLet",     // Departamento de Letras
    "DFil",     // Departamento de Filosofia
  ],
};

export const getPostTags = (universitySlug: string = "usp", userSubjects: string[] = []): string[] => {
  const universityTags = POST_TAGS_BY_UNIVERSITY[universitySlug] || POST_TAGS_BY_UNIVERSITY.usp;
  return [...userSubjects, ...universityTags];
};

export const getUniversityDisplayName = (universitySlug: string = "usp"): string => {
  const universityNames: { [key: string]: string } = {
    usp: "USP",
    ufscar: "UFSCar",
  };
  return universityNames[universitySlug] || "USP";
};

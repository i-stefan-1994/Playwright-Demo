const desktopFilesSelected = [
    'desktop',
    'notes',
    'commands'
]


 const workspaceDocumentsSelected = [
    'workspace',
    'react',
    'angular',
    'veu'
]

 const officeDocumentsSelected = [
    'office',
    'public',
    'private',
    'classified',
    'general'
]

 const documentsFilesSelected = [
    ...workspaceDocumentsSelected,
    ...officeDocumentsSelected 
];

 const downloadsFilesSelected = [
    'downloads',
    'wordFile',
    'excelFile'
]

 const homeFilesSelected = [
    'home',
    ...desktopFilesSelected,
    ...documentsFilesSelected,
    ...downloadsFilesSelected
]

export const selectedFiles = {
    Desktop: desktopFilesSelected,
    DesktopNotes: 'Notes',
    DesktopCommands: 'Commands',
    DocumentsWorkspace: workspaceDocumentsSelected,
    DocumentsOffice: officeDocumentsSelected,
    Documents: documentsFilesSelected,
    Downloads: downloadsFilesSelected,
    Home: homeFilesSelected
}
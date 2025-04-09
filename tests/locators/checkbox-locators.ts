export const checkboxLocators = {
    checkboxPage: 'https://demoqa.com/checkbox',
    homeCheckboxVisual: 'label[for="tree-node-home"] .rct-checkbox', //this is the visual input for the checkbox
    homeCheckbox: '#tree-node-home', //this is the real input class
    folderSubfolderTextLocators: '.rct-text',
    extendAndCollapseBar: '.rct-collapse',
    resultLocator: '[id="result"]'
}

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
    DocumentsWorkspace: workspaceDocumentsSelected,
    DocumentsOffice: officeDocumentsSelected,
    Documents: documentsFilesSelected,
    Downloads: downloadsFilesSelected,
    Home: homeFilesSelected
}
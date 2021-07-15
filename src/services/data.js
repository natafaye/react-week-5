
export const TAGS = [
    {
        id: 0,
        title: "Work"
    },
    {
        id: 1,
        title: "Personal"
    },
    {
        id: 2,
        title: "Important"
    }
]

export const NOTES = [
    {
        id: 0,
        title: "Shopping List",
        text: "Apples\nTomatoes\nOnions\nBread",
        tags: [ 1, 2 ],
        lastSaved: Date.now()
    },
    {
        id: 1,
        title: "Address of Doctor's Office",
        text: "123 Main St\nReno, NV 85858",
        tags: [],
        lastSaved: Date.now()
    },
    {
        id: 2,
        title: "Very Important Words",
        text: "Nulla placerat sit amet nisi nec ullamcorper. Phasellus convallis,"
            + "nibh ullamcorper molestie molestie, mauris enim ultricies erat, sed "
            + "finibus sem purus vel tortor. Curabitur eleifend vel sapien et consectetur. "
            + "Vestibulum vel tempor nunc. Suspendisse potenti.\n\nIn hac habitasse platea "
            + "dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. "
            + "Curabitur auctor ultrices justo. Phasellus vestibulum, arcu in viverra "
            + "maximus, dui odio lobortis ante, sed vehicula ante leo et felis. Quisque "
            + "posuere, lacus id interdum vehicula, turpis sem pretium nunc, et porta "
            + "ligula urna id massa. Mauris ac fringilla enim.",
        tags: [ 0 ],
        lastSaved: Date.now()
    }
]
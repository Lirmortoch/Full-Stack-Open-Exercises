sequenceDiagram
    participant browser 
    participant server

    Note over browser,server: First of all, fetch resources

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: reload page
    deactivate server

    Note right of server: Server creates a new note object<br>and pushes it to the notes array,<br>then page will be reloaded 

    Note over browser,server: Repeat fetching process of the resources
const alachuacc = fetch("https://legal-docs-generator.herokuapp.com/summons/alachua&cc").then(response => response.json())

tinymce.init({
    selector: '#createDocArea',
    plugins:'fullscreen pagebreak searchreplace table print template',
    toolbar: 'template',
    height: '50vh',
    width: '85vw',
    toolbar_sticky: true,
    autosave_restore_when_empty:true,
    templates: [
        {
            title: "Alachua County Civil Summons",
            description: "FL Alachua CC summons template",
            // content: "<p>plaintiff: {$plaintiff_name}</p>"+"<p>defendant: {$defendant_name}</p>"+"<p>Case no: {$case_num}</p>"
            content: alachuacc
        }
    ],

    template_replace_values: {
        plaintiff_name: "Bank of Americat",
        defendant_name: "Cat Cabbag",
        case_num: "2022sc123456"
    }
});



// const alachuacc = fetch("https://legal-docs-generator.herokuapp.com/summons/alachua&cc")
//     .then(response => response.json())
//     .then(data => data.docText)
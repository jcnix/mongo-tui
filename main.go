package main

import (
	"encoding/json"
	"fmt"
	"os"

	tea "github.com/charmbracelet/bubbletea"
	tree "github.com/charmbracelet/lipgloss/tree"
)

type model struct {
	cursor int
}

func initialModel() model {
	return model{
		cursor: 0,
	}
}

func (m model) Init() tea.Cmd {
	return nil
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:

		switch msg.String() {
		case "ctrl+c", "q":
			return m, tea.Quit
		}
	}

	return m, nil
}

func createTree(t *tree.Tree, data map[string]interface{}) *tree.Tree {
	for k := range data {
		switch data[k].(type) {
		case float64:
			t.Child(fmt.Sprintf("%s: %v (%T)", k, data[k], data[k]))
		case bool:
			t.Child(fmt.Sprintf("%s: %v (%T)", k, data[k], data[k]))
		case string:
			t.Child(fmt.Sprintf("%s: %v (%T)", k, data[k], data[k]))
		case []interface{}:
			for j := range data[k].([]interface{}) {
				t.Child(fmt.Sprintf("%s: %v (%T)", k, j, j))
			}
		default:
			if data[k] != nil {
				subtree := tree.New().Root("objectValue")
				createTree(subtree, data[k].(map[string]interface{}))
				t.Child(subtree)
			} else {
				t.Child(fmt.Sprintf("%s: %v", k, data[k]))
			}
		}
	}

	return t
}

func (m model) View() string {
	jsonData := `
		{
			"intValue":1234,
			"boolValue":true,
			"stringValue":"hello!",
			"dateValue":"2022-03-02T09:10:00Z",
			"objectValue":{
        "arrayValue":[1,2,3,4],
        "intValue": 56789
			},
			"nullStringValue":null,
			"nullIntValue":null
		}
	`

	var data map[string]interface{}
	err := json.Unmarshal([]byte(jsonData), &data)
	if err != nil {
		fmt.Printf("could not unmarshal json: %s\n", err)
		return ""
	}

	t := tree.Root(".")
	// t := tree.Root(data["stringValue"]).
	// 	Child("A", "B", "C")

	createTree(t, data)

	// return t.String()
	return fmt.Sprintf("%s\n", t)
}

func main() {
	// p := tea.NewProgram(initialModel(), tea.WithAltScreen())
	p := tea.NewProgram(initialModel())
	if _, err := p.Run(); err != nil {
		fmt.Printf("Alas, there's been an error: %v", err)
		os.Exit(1)
	}
}

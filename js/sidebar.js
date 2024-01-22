class SidebarControl {
  constructor(
    elements = {
      panels: undefined,
      control_buttons: undefined,
      route: undefined,
    }
  ) {
    this.panels = elements.panels
    this.control_buttons = elements.control_buttons
    this.route = elements.route
  }

  initialize() {
    this.control_buttons.forEach((element) => {
      element.addEventListener("click", () => {
        this.panels.forEach((e) => {
          e.style.display = "none"
        })
        switch (element.dataset.action) {
          case "open_dashboard":
            this.changeActiveRoute(this.route, ["", "Dashboard"])
            this.panels[0].style.display = "block"
            break

          case "open_monitor_camera":
            this.changeActiveRoute(this.route, ["", "Dashboard", "Monitor"])
            this.panels[1].style.display = "flex"
            break

          case "open_add_face":
            this.changeActiveRoute(this.route, ["", "Dashboard", "Add Face"])
            this.panels[2].style.display = "block"
            break

          case "open_settings":
            this.changeActiveRoute(this.route, ["", "Dashboard", "Settings"])
            this.panels[3].style.display = "block"
            break

          case "reload_page":
            location.reload()
            break

          default:
            throw new Error("No matching action found!")
        }
      })
    })
  }

  changeActiveRoute(element, routes) {
    const _active = element.querySelector(".route__active")
    const _inactive = element.querySelector(".route__inactive")
    if (routes.length == 2) {
      _inactive.textContent = "/ "
      _active.textContent = routes[1]
      return
    }
    _inactive.textContent = `/ ${routes[1]} /`
    _active.textContent = routes[2]
    return
  }
}

const sidebar_controls = new SidebarControl({
  panels: document.querySelectorAll(".panel"),
  control_buttons: document.querySelectorAll(".sidebar__control > button"),
  route: document.querySelector(".titlebar__route"),
})
sidebar_controls.initialize()
sidebar_controls.changeActiveRoute(document.querySelector(".titlebar__route"), [
  "",
  "Dashboard",
  "Monitor",
])

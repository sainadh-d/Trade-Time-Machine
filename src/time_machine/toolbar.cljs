(ns time-machine.toolbar
  (:require ["@material-ui/core/AppBar" :default AppBar]
            ["@material-ui/core/Toolbar" :default Toolbar]
            ["@material-ui/core/Typography" :default Typography]
            ["@material-ui/core/IconButton" :default IconButton]
            ["@material-ui/core/TextField" :default TextField]
            ["@material-ui/icons/PlayArrow" :default PlayArrowIcon]
            ["@material-ui/icons/Stop" :default StopIcon]
            ["@material-ui/core/Tooltip" :default Tooltip]
            [time-machine.state :refer [app-state]]))

(defn toolbar []
  [:div.topbar
   [:> AppBar {:color "transparent" :position "static"}
    [:> Toolbar
     [:> Typography {:variant "h5" :classes {:root "title"}} "Time Machine"]
     [:> TextField
      {:type "date"
       :required true
       :label "Start Date"
       :InputLabelProps {:shrink true}
       :onChange (fn [e] (swap! app-state assoc :start-date (.. e -target -value)))}]
     [:> Tooltip {:title "Start Session"}
      [:> IconButton {:classes {:root "play-btn"} :on-click (fn [] (swap! app-state assoc :start-session true))}
       [:> PlayArrowIcon]]]
     [:> Tooltip {:title "End Session"}
      [:> IconButton  {:classes {:root "stop-btn"} :on-click (fn [] (swap! app-state assoc :start-session false))}
       [:> StopIcon]]]]]])

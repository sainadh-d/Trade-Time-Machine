(ns time-machine.core
  (:require [reagent.dom :refer [render]]
            [time-machine.state :refer [app-state]]
            [time-machine.toolbar :refer [toolbar]]
            ["/js/Chart" :default ChartComponent]))

(defn on-price-changed [price]
  (swap! app-state assoc :current-price price))

(defn MainComponent []
  [:div
   [toolbar]
   (when (:start-session @app-state)
     [:> ChartComponent {:onPriceChanged on-price-changed
                         :chartHeight 700
                         :startDate (:start-date @app-state)
                         :ticker "RELIANCE"}])])

(defn start []
  (render [MainComponent] (. js/document (getElementById "app"))))

(defn ^:export init []
  ;; init is called ONCE when the page loads
  ;; this is called in the index.html and must be exported
  ;; so it is available even in :advanced release builds
  (start))

(defn stop []
  ;; stop is called before any code is reloaded
  ;; this is controlled by :before-load in the config
  (js/console.log "stop"))

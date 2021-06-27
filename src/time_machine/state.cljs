(ns time-machine.state
  (:require [reagent.core :refer [atom]]))

(defonce app-state
  (atom
   {:start-session false
    :start-date ""
    :current-price {}}))

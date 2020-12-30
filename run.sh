#! /bin/sh
#
# run.sh
# Copyright (C) 2020 Pedro Pablo <ppablocruzcobas@gmail.com>
#
# Distributed under terms of the MIT license.
#
mvn clean install
java -jar target/reservation-0.0.1-SNAPSHOT.jar

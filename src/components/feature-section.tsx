import React from "react";
import { features } from "@/data/data";

const FeatureSection = () => {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Fitur Unggulan AgroWin
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk mengelola pertanian modern dengan
            efisien dan menguntungkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
